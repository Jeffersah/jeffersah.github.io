(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{89:function(i){i.exports=JSON.parse('{"$schema":"./shipDefinitions.schema.json","animations":{"tiny_flare":{"file":"Flares","imgOffset":[0,0],"frameSize":[8,4],"numFrames":6,"origin":[0,0.5]},"small_flare":{"file":"Flares","imgOffset":[0,16],"frameSize":[16,8],"numFrames":8,"origin":[0,0.5]}},"ships":[{"name":"red_interceptor","size":[16,16],"sprite":{"srcSize":[16,16],"srcOffset":[64,32],"origin":[0.25,0.5],"file":"Ships"},"hp":5,"maxAccel":0.1,"maxDeccel":0.01,"maxSpeed":3,"turnAccel":0.001,"maxTurnSpeed":0.05,"flares":[{"animation":"tiny_flare","offset":[0,8],"rotation":0.5,"condition":["accel","turnLeft","turnRight"],"rotPerTurn":-0.8},{"animation":"tiny_flare","offset":[10,4],"rotation":0.75,"condition":"turnRight","minTrigger":0.1},{"animation":"tiny_flare","offset":[10,12],"rotation":0.25,"condition":"turnLeft","minTrigger":0.1}],"weaponGroups":[{"timer":{"reloadTime":60,"burstCount":1,"burstDelay":0,"shotsPerBurst":1},"weapons":[{"offset":[16,8],"rotation":0,"acquisitionAngle":0.2,"range":80}],"burstAll":false}],"ai":"fighter"},{"name":"blue_interceptor","size":[16,16],"sprite":{"srcSize":[16,16],"srcOffset":[64,128],"origin":[0.25,0.5],"file":"Ships"},"hp":5,"maxAccel":0.1,"maxDeccel":0.01,"maxSpeed":3,"turnAccel":0.001,"maxTurnSpeed":0.05,"flares":[{"animation":"tiny_flare","offset":[0,3],"rotation":0.5,"condition":["accel","turnLeft","turnRight"],"rotPerTurn":-0.8},{"animation":"tiny_flare","offset":[0,13],"rotation":0.5,"condition":["accel","turnLeft","turnRight"],"rotPerTurn":-0.8}],"weaponGroups":[],"ai":"fighter"},{"name":"red_fighter","size":[32,32],"sprite":{"srcSize":[32,32],"srcOffset":[64,64],"origin":[0.25,0.5],"file":"Ships"},"hp":5,"maxAccel":0.1,"maxDeccel":0.01,"maxSpeed":3,"turnAccel":0.001,"maxTurnSpeed":0.05,"flares":[{"animation":"small_flare","offset":[0,16],"rotation":0.5,"condition":["accel","turnLeft","turnRight"],"rotPerTurn":-0.8},{"animation":"tiny_flare","offset":[24,11],"rotation":0.75,"condition":"turnRight","minTrigger":0.1},{"animation":"tiny_flare","offset":[24,22],"rotation":0.25,"condition":"turnLeft","minTrigger":0.1}],"weaponGroups":[],"ai":"fighter"},{"name":"blue_fighter","size":[32,32],"sprite":{"srcSize":[32,32],"srcOffset":[64,160],"origin":[0.25,0.5],"file":"Ships"},"hp":5,"maxAccel":0.1,"maxDeccel":0.01,"maxSpeed":3,"turnAccel":0.001,"maxTurnSpeed":0.05,"flares":[{"animation":"small_flare","offset":[0,16],"rotation":0.5,"condition":["accel","turnLeft","turnRight"],"rotPerTurn":-0.8},{"animation":"tiny_flare","offset":[24,11],"rotation":0.75,"condition":"turnRight","minTrigger":0.1},{"animation":"tiny_flare","offset":[24,22],"rotation":0.25,"condition":"turnLeft","minTrigger":0.1}],"weaponGroups":[],"ai":"fighter"},{"name":"red_small_cruiser","size":[48,32],"sprite":{"srcSize":[48,32],"srcOffset":[48,0],"origin":[0.25,0.5],"file":"Ships"},"hp":5,"maxAccel":0.08,"maxDeccel":0.01,"maxSpeed":3,"turnAccel":0.001,"maxTurnSpeed":0.03,"flares":[{"animation":"small_flare","offset":[0,12],"rotation":0.5,"condition":["accel","turnLeft","turnRight"],"rotPerTurn":-0.8},{"animation":"small_flare","offset":[0,21],"rotation":0.5,"condition":["accel","turnLeft","turnRight"],"rotPerTurn":-0.8},{"animation":"tiny_flare","offset":[31,8],"rotation":0.75,"condition":"turnRight","minTrigger":0.1},{"animation":"tiny_flare","offset":[31,25],"rotation":0.25,"condition":"turnLeft","minTrigger":0.1}],"weaponGroups":[],"ai":"broadside","aiParams":{"minDistance":100,"maxDistance":250,"orbitSpeed":0.5}},{"name":"blue_small_cruiser","size":[48,32],"sprite":{"srcSize":[48,32],"srcOffset":[48,96],"origin":[0.25,0.5],"file":"Ships"},"hp":5,"maxAccel":0.08,"maxDeccel":0.01,"maxSpeed":3,"turnAccel":0.001,"maxTurnSpeed":0.03,"flares":[{"animation":"small_flare","offset":[0,12],"rotation":0.5,"condition":["accel","turnLeft","turnRight"],"rotPerTurn":-0.8},{"animation":"small_flare","offset":[0,21],"rotation":0.5,"condition":["accel","turnLeft","turnRight"],"rotPerTurn":-0.8},{"animation":"tiny_flare","offset":[31,8],"rotation":0.75,"condition":"turnRight","minTrigger":0.1},{"animation":"tiny_flare","offset":[31,25],"rotation":0.25,"condition":"turnLeft","minTrigger":0.1}],"weaponDefinitions":{"main_gun":{"acquisitionAngle":0.03,"range":120}},"weaponGroups":[{"weapons":[{"definition":"main_gun","offset":[11,9],"rotation":0.25},{"definition":"main_gun","offset":[19,9],"rotation":0.25},{"definition":"main_gun","offset":[27,9],"rotation":0.25},{"definition":"main_gun","offset":[34,9],"rotation":0.25}],"timer":{"burstCount":4,"burstDelay":30,"reloadTime":120,"shotsPerBurst":1}},{"weapons":[{"definition":"main_gun","offset":[11,24],"rotation":0.75},{"definition":"main_gun","offset":[19,24],"rotation":0.75},{"definition":"main_gun","offset":[27,24],"rotation":0.75},{"definition":"main_gun","offset":[34,24],"rotation":0.75}],"timer":{"burstCount":4,"burstDelay":30,"reloadTime":120,"shotsPerBurst":1}}],"ai":"broadside","aiParams":{"minDistance":100,"maxDistance":250,"orbitSpeed":0.5}},{"name":"red_small_missile_cruiser","size":[48,32],"sprite":{"srcSize":[48,32],"srcOffset":[0,0],"origin":[0.25,0.5],"file":"Ships"},"hp":5,"maxAccel":0.08,"maxDeccel":0.01,"maxSpeed":3,"turnAccel":0.001,"maxTurnSpeed":0.03,"flares":[{"animation":"small_flare","offset":[0,12],"rotation":0.5,"condition":["accel","turnLeft","turnRight"],"rotPerTurn":-0.8,"minTrigger":0.1},{"animation":"small_flare","offset":[0,21],"rotation":0.5,"condition":["accel","turnLeft","turnRight"],"rotPerTurn":-0.8,"minTrigger":0.1},{"animation":"tiny_flare","offset":[31,8],"rotation":0.75,"condition":"turnRight","minTrigger":0.1},{"animation":"tiny_flare","offset":[31,25],"rotation":0.25,"condition":"turnLeft","minTrigger":0.1}],"weaponGroups":[],"ai":"broadside","aiParams":{"minDistance":200,"maxDistance":350,"orbitSpeed":0.2}},{"name":"blue_small_missile_cruiser","size":[48,32],"sprite":{"srcSize":[48,32],"srcOffset":[0,96],"origin":[0.25,0.5],"file":"Ships"},"hp":5,"maxAccel":0.08,"maxDeccel":0.01,"maxSpeed":3,"turnAccel":0.001,"maxTurnSpeed":0.03,"flares":[{"animation":"small_flare","offset":[0,12],"rotation":0.5,"condition":["accel","turnLeft","turnRight"],"rotPerTurn":-0.8,"minTrigger":0.1},{"animation":"small_flare","offset":[0,21],"rotation":0.5,"condition":["accel","turnLeft","turnRight"],"rotPerTurn":-0.8,"minTrigger":0.1},{"animation":"tiny_flare","offset":[31,8],"rotation":0.75,"condition":"turnRight","minTrigger":0.1},{"animation":"tiny_flare","offset":[31,25],"rotation":0.25,"condition":"turnLeft","minTrigger":0.1}],"weaponGroups":[],"ai":"broadside","aiParams":{"minDistance":200,"maxDistance":350,"orbitSpeed":0.2}},{"name":"red_cargo","size":[64,48],"sprite":{"srcSize":[64,48],"srcOffset":[0,32],"origin":[0.25,0.5],"file":"Ships"},"hp":5,"maxAccel":0.04,"maxDeccel":0.01,"maxSpeed":2,"turnAccel":0.001,"maxTurnSpeed":0.01,"flares":[{"animation":"small_flare","offset":[0,14],"rotation":0.5,"condition":["accel","turnRight"]},{"animation":"small_flare","offset":[0,20],"rotation":0.5,"condition":["accel","turnRight"]},{"animation":"small_flare","offset":[0,28],"rotation":0.5,"condition":["accel","turnLeft"]},{"animation":"small_flare","offset":[0,34],"rotation":0.5,"condition":["accel","turnLeft"]}],"weaponGroups":[],"ai":"fighter"},{"name":"blue_cargo","size":[64,48],"sprite":{"srcSize":[64,48],"srcOffset":[0,128],"origin":[0.25,0.5],"file":"Ships"},"hp":5,"maxAccel":0.04,"maxDeccel":0.01,"maxSpeed":2,"turnAccel":0.001,"maxTurnSpeed":0.01,"flares":[{"animation":"small_flare","offset":[0,14],"rotation":0.5,"condition":["accel","turnRight"]},{"animation":"small_flare","offset":[0,20],"rotation":0.5,"condition":["accel","turnRight"]},{"animation":"small_flare","offset":[0,28],"rotation":0.5,"condition":["accel","turnLeft"]},{"animation":"small_flare","offset":[0,34],"rotation":0.5,"condition":["accel","turnLeft"]}],"weaponGroups":[],"ai":"fighter"}]}')}}]);
//# sourceMappingURL=bullets-ship-definitions.bundle.js.map