import ISortDescriptor from "./ISortDescriptor";
import * as React from 'react';
import { RenderArrayState } from "./RenderArrayState";

const MainSortDescriptor: ISortDescriptor = {
    displayName: 'Sorting Algorithms',
    getDescription: () => {
        return <div>
            <h2>Sorting algorithms</h2>
            <p>
                This project provides visualizations of various sorting algorithms, to hopefully make them easier to learn and understand. Also, it's just because I think they're neat.
            </p>
            <h4>What is a sorting algorithm?</h4>
            <p>Let's say you've got a bunch of data in an array. We'll visualize your array like a graph, as below:</p>
            {RenderArrayState([8, 7, 2, 10, 1, 6, 4, 5, 3, 9], 20)}
            <p>The X-coordinate is it's position in the list, and the Y-coordinate is the items value. When we sort the array, we'll get a result like this:</p>
            {RenderArrayState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 20)}
            <p>All the elements are now in ascending order. We want to go from the random starting position to this sorted position as fast as possible, using only a few basic operations:</p>
            <hr />

            <h5>Compare</h5>
            <p>Sorting algorithms can compare two items to see which is greater. We visualize this with a red arc. For example, comparing the first and last elements would look like this:</p>
            {RenderArrayState([6, 2, 10], 20, [{ from: 0, to: 2, color: '#f00'}])}
            <p>Sorting algorithms generally can only compare two items at a time, and this is the only way they can tell what order two elements should fall into.</p>
            <h5>Swap</h5>
            <p>To move elements, algorithms generally have to swap two items. We represent this with a green arc.</p>
            {RenderArrayState([6, 2, 10], 20, [{ from: 0, to: 2, color: '#0f0'}])}
            {RenderArrayState([10, 2, 6], 20)}
            <h5>Get/Set</h5>
            <p>Algorithms can move items to/from extra storage, which we represent with an orange line, or just read a value and then set a value later.
                This happens rarely, as it means the algorithm is using additional storage space. The algorithms here try to avoid doing so to keep their operation apparent</p>
            
            <hr />
            <h4>How do we grade a sorting algorithm?</h4>
            <p>Sorting algorithms are usually rated in 'Big-O' notation, which tells you how well an algorithm works as the amount of data to sort grows. We're not going to talk much about big-O here, because I'm not a comp-sci teacher.</p>
            <p>Instead, we'll use an experimental approach. Better algorithms are those which sort the result with fewer total comparisons and swaps. We'll assume each compare/swap takes the same amount of time, and therefore, the fewer swaps/compares, the better.</p>
            <p>We can call this the "speed" of the sorting algorithm. "Faster" algorithms will use generally fewer comparisions than "slower" algorithms. However, this is not the only important consideration with algorithms. There are some others, such as:</p>

            <h4>Stability</h4>
            <p>Stability is a property that some algorithms have, which means that if more than one element has the same value, they'll <i>always</i> come out in the same order they went in. For example, sort the following, keeping an eye on the colored elements:</p>
            {RenderArrayState([3, 2, 3, 3, 6, 3, 1], 16, undefined, ['#533', null, '#353', '#335', null, '#553', null])}
            <p>When sorted by a stable sort, the colored elements will be in the same order after the sort:</p>
            {RenderArrayState([1, 2, 3, 3, 3, 3, 6], 16, undefined, [null, null, '#533', '#353', '#335', '#553', null])}
            <p>When sorted by an unstable sort, you may get a result like this:</p>
            {RenderArrayState([1, 2, 3, 3, 3, 3, 6], 16, undefined, [null, null, '#353', '#533', '#553', '#335', null])}
            <p>The output will still be sorted, but the elements with the same value may be shuffled around. Stable sorts are nice because they allow you to sort the same array multiple times with multiple criteria do a 'sort by this, then by that' type of operation</p>
            <p>For the purposes of our visualisation, however, stability doesn't really matter.</p>
            
            <h4>In-Place</h4>
            <p>An algorithm is "In-Place" if it always uses the same amount of memory, regardless of the amount of data it is sorting.</p>
            <p>In-Placeness is a very useful attribute, as otherwise, a sorting algorithm may use a lot of memory when sorting large arrays.</p>
            <p>Unfortunately, because nothing is ever easy in CS, there are two different common definitions of in-place. The first is what I'll call "Strictly in-place", which is exactly as defined above. An algorithm uses a fixed amount of extra memory, which doesn't scale at all with the quantity of data being sorted.</p>
            <p>Many divide-and-conquer algorithms fail this requirement, but only because they are recursive, which requires allocating space on the stack. This stack-space allocation is sometimes considered "free", making these algorithms "In-Place" as long as they don't allocate additional memory outside of the stack growing.
                I'll call this "Loosely In-Place". Most algorithms which are "In Place" are "Looseley In-Place" as using a strict upper memory limit is quite restrictive.</p>
            <hr />
            <p>Well, that's enough of an info-dump. Poke around with some algorithms!</p>
        </div>;
    }
};

export default MainSortDescriptor;