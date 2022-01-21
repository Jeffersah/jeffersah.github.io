import AssetLoader from '../common/assets/AssetLoader';
import Const from './const';
import NearestNeighborScalingHelper from '../common/NearestNeighborScalingHelper';
import { NearestNeighborScaling, RotTransformCanvas } from '../common/CanvasHelpers';
import { SpriteSheet } from '../common/assets/SpriteSheet';
import entitySheetUrl from './assets/bullets_entities.png';
import shipSheetUrl from './assets/Ships.png';
import flareSheetUrl from './assets/Flares.png';
import playerUrl from './assets/bullets_ship.png';
import ImageLoader from '../common/assets/ImageLoader';
import Player from './Player';
import KeyboardManager from '../common/input/KeyboardManager';
import KeyState from '../common/input/KeyState';
import Point from '../common/position/Point';
import GameState from './GameState';
import { SingleExplosion } from './Effects/SingleExplosion';
import { Interpolated } from '../common/interpolation/Interpolated';
import { TimingFunctions } from '../common/interpolation/TimingFunction';
import { Color } from '../common/Color';
import { EvenlySpacedKeyframes, Keyframes } from '../common/interpolation/Keyframes';
import { Explosion } from './Effects/Explosion';
import { Range } from '../common';
import { AtlasSprite, SpriteAtlas } from '../common/assets/SpriteAtlas';
import { buildAllDefinitions } from './ShipDefinitions/AllShipDefinitions';
import { ETeam } from './ETeam';
import IShipDefinitionsFile from './data/IJsonShipDefinition';
import { ShipDefinition } from './ShipDefinitions/ShipDefinition';
import INamedCollection from '../common/INamedCollection';

let atlases: INamedCollection<SpriteAtlas>;
let scalingHelper: NearestNeighborScalingHelper;
let shipSprite: AtlasSprite;

export default function Run() {
    const assetLoader = new AssetLoader();
    const entitySheet = new SpriteSheet(8, 16, entitySheetUrl, assetLoader.registerAssetLoadCallback());
    const shipAtlas = new SpriteAtlas(shipSheetUrl, assetLoader.registerAssetLoadCallback());
    const flareAtlas = new SpriteAtlas(flareSheetUrl, assetLoader.registerAssetLoadCallback());
    atlases = {
        "Ships": shipAtlas,
        "Flares": flareAtlas
    };

    assetLoader.onAllFinished(() => loadJson(entitySheet));
}

function loadJson(entitySheet: SpriteSheet){
    import(
        /* webpackChunkName: "bullets-ship-definitions" */
        './data/shipDefinitions.json'
    ).then(value => {
        console.log('Got shipDefinitions.json');
        const definitions = buildAllDefinitions(<IShipDefinitionsFile><any>value, atlases);
        onLoadDone(entitySheet, definitions);
    });
}

function onLoadDone(entitySheet: SpriteSheet, definitions: ShipDefinition[]) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    scalingHelper = new NearestNeighborScalingHelper(canvas, ctx, Const.Width, Const.Height, true, () => { return; });
    NearestNeighborScaling(ctx);

    shipSprite = atlases["Ships"].getSprite(new Point(96, 0), new Point(32, 48), new Point(0.5, 1));

    const keys = new KeyboardManager(document.body, false);
    const player = new Player(entitySheet);

    const gs = new GameState(player, keys);

    gs.Effects.push(new SingleExplosion(
        new Point(0, 0),
        new Interpolated<number>(EvenlySpacedKeyframes(0, 30), TimingFunctions.linear),
        new Interpolated<number>(EvenlySpacedKeyframes(-10, 30), TimingFunctions.fastOut),
        new Interpolated<Color>(EvenlySpacedKeyframes(Color.rgb(1, 1, 0.5), Color.rgb(1, 0, 0), Color.rgb(0.2, 0.2, 0)), TimingFunctions.linear),
        120
    ));

    gs.Effects.push(new Explosion(
        new Point(100, 0),
        new Range(-30, 30),
        new Range(-30, 30),
        new Range(30, 30),
        4,
        new Range(20, 40),
        new Range(20, 60)));

    for(let i = 0; i < definitions.length; i++){
        const team = i % 2 === 0 ? ETeam.enemy : ETeam.ally;
        gs.Entities[team].push(definitions[i].buildShip(team, new Point(-100 * (i+1), 0), Math.random() * Math.PI * 2));
    }

    repaintLoop(gs, player, keys, canvas, ctx);
}

function repaintLoop(gameState: GameState, player: Player, keys: KeyboardManager, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    keys.update();
    gameState.tick();
    player.tick(keys);
    repaint(gameState, player, canvas, ctx);
    requestAnimationFrame(() => repaintLoop(gameState, player, keys, canvas, ctx));
}

function repaint(gameState: GameState, player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    NearestNeighborScaling(ctx);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, Const.Width, Const.Height);
    ctx.save();

    const focusPoint = Point.add(player.position, Point.multiply(player.velocity, 10));

    ctx.translate(-(focusPoint.x - Const.Width / 2), -(focusPoint.y - Const.Height / 2));
    ctx.fillStyle = 'gray';

    const bg_line_size = 400;

    // Render some bg lines so we can see motion
    for (let ty = Math.floor((focusPoint.y - Const.Height / 2) / bg_line_size) * bg_line_size; ty <= Math.floor((focusPoint.y + Const.Height / 2) / bg_line_size) * bg_line_size; ty += bg_line_size) {
        ctx.fillRect(focusPoint.x - Const.Width / 2, ty, Const.Width, 3);
    }

    for (let tx = Math.floor((focusPoint.x - Const.Width / 2) / bg_line_size) * bg_line_size; tx <= Math.floor((focusPoint.x + Const.Width / 2) / bg_line_size) * bg_line_size; tx += bg_line_size) {
        ctx.fillRect(tx, focusPoint.y - Const.Height / 2, 3, Const.Height);
    }

    player.render(ctx);

    gameState.draw(ctx);

    ctx.restore();
}