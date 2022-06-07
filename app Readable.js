/* eslint-disable indent */

// Constants and function calls
const barContainer = document.querySelector('#bar-container')

const newArray = document.querySelector('#genarr')
newArray.addEventListener('click', () => {
    clearResults()
    generateArray()
    showcard('someclass')
})
const bsort = document.querySelector('#bsort')
bsort.addEventListener('click', () => {
    bubbleSort(heights)
    showcard('bf')
})

const msort = document.querySelector('#Msort')
msort.addEventListener('click', async () => {
    showcard('mf')
    await mergeSort(heights, 0, heights.length - 1)
    resultanimation(heights)
})

const qsort = document.querySelector('#qsort')
qsort.addEventListener('click', async () => {
    showcard('qf')
    await quicksort(heights, 0, heights.length - 1)
    resultanimation(heights)
})

const isort = document.querySelector('#isort')
isort.addEventListener('click', () => {
    insertionsort(heights)
    showcard('if')
})

const Ssort = document.querySelector('#Ssort')
Ssort.addEventListener('click', () => {
    selectionsort(heights)
    showcard('sf')
})

const showt = document.querySelector('#showt')
showt.addEventListener('click', () => {
    showcard('tb')
})

const size = document.querySelector('#size')
size.addEventListener('change', () => {
    clearResults()
    generateArray()
})

const flashcards = [document.querySelector('#qf'), document.querySelector('#mf'), document.querySelector('#bf'), document.querySelector('#if'), document.querySelector('#sf'), document.querySelector('#tb')]

let heights = []

// Function definition part

function showcard(name) {
    for (const div of flashcards) {
        if (div.id === name) {
            div.classList.remove('hide')
        } else {
            if (!div.classList.contains('hide')) {
                div.classList.add('hide')
            }
        }
    }
}

function generateArray(n = size.value) {
    heights = []
    for (let i = 0; i < n; i++) {
        const ht = Math.floor(Math.random() * 400) + 1
        const bar = document.createElement('div')
        bar.style.height = `${ht}px`
        bar.classList.add('bar')
        barContainer.appendChild(bar)
        heights[i] = bar
    }
}
generateArray()

function clearResults() {
    while (barContainer.firstChild) {
        barContainer.removeChild(barContainer.firstChild)
    }
}

function swap(a, b) {
    const temp = a.style.height
    a.style.height = b.style.height
    b.style.height = temp
}

async function resultanimation(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.background = 'lightgreen'
    }
}

async function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (parseInt(arr[j].style.height) > parseInt(arr[j + 1].style.height)) {
                arr[j].style.background = '#e63946'
                arr[j + 1].style.background = '#e63946'
                await new Promise(resolve => setTimeout(() => { resolve() }, 2))
                swap(arr[j], arr[j + 1])
                arr[j].style.background = '#a8dadc'
                arr[j + 1].style.background = '#a8dadc'
            }
            arr[arr.length - i - 1].style.background = '#457b9d'
        }
    }
    resultanimation(arr)
}

async function partition(arr, lb, ub) {
    arr[ub].style.background = '#457b9d'
    const pivot = parseInt(arr[ub].style.height); let pIndex = lb
    for (let i = lb; i < ub; i++) {
        if (parseInt(arr[i].style.height) < pivot) {
            arr[i].style.background = '#e63946'
            arr[pIndex].style.background = '#e63946'
            await new Promise(resolve => setTimeout(() => { resolve() }), 5)
            swap(arr[i], arr[pIndex])
            arr[i].style.background = '#a8dadc'
            arr[pIndex].style.background = '#a8dadc'
            pIndex++
        }
    }
    swap(arr[ub], arr[pIndex])
    return pIndex
}

async function quicksort(arr, lowerBound, upperBound) {
    if (lowerBound < upperBound) {
        const p = await partition(arr, lowerBound, upperBound)
        await quicksort(arr, lowerBound, p - 1)
        await quicksort(arr, p + 1, upperBound)
    }
}

async function insertionsort(arr) {
    let i, j, temp
    for (i = 1; i < arr.length; i++) {
        temp = arr[i].style.height
        j = i - 1
        while (j >= 0 && parseInt(arr[j].style.height) > parseInt(temp)) {
            arr[j].style.background = '#e63946'
            arr[j + 1].style.background = '#e63946'
            await new Promise(resolve => setTimeout(() => { resolve() }, 2))
            arr[j + 1].style.height = arr[j].style.height
            arr[j].style.background = '#a8dadc'
            arr[j + 1].style.background = '#a8dadc'
            j = j - 1
        }
        arr[j + 1].style.height = temp
        arr[j + 1].style.background = '#457b9d'
    }
    resultanimation(arr)
}

async function selectionsort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let min = i
        for (let j = i + 1; j < arr.length; j++) {
            if (parseInt(arr[j].style.height) < parseInt(arr[min].style.height)) {
                arr[min].style.background = '#a8dadc'
                min = j
                arr[min].style.background = '#457b9d'
                await new Promise(resolve => setTimeout(() => { resolve() }, 15))
            }
        }
        arr[i].style.background = '#e63946'
        arr[min].style.background = '#e63946'
        await new Promise(resolve => setTimeout(() => { resolve() }, 15))
        swap(arr[i], arr[min])
        arr[i].style.background = '#a8dadc'
        arr[min].style.background = '#a8dadc'
    }
    resultanimation(arr)
}


async function merge(arr, start, mid, end) {
    let start2 = mid + 1;

    // If the direct merge is already sorted
    if (parseInt(arr[mid].style.height) <= parseInt(arr[start2].style.height)) {
        return;
    }

    // Two pointers to maintain start
    // of both arrays to merge
    while (start <= mid && start2 <= end) {

        // If element 1 is in right place
        if (parseInt(arr[start].style.height) <= parseInt(arr[start2].style.height)) {
            start++;
        }
        else {
            let value = arr[start2].style.height;
            let index = start2;

            // Shift all the elements between element 1
            // element 2, right by 1.
            while (index != start) {
                arr[index].style.background = '#e63946'
                arr[index - 1].style.background = '#e63946'
                await new Promise(resolve => setTimeout(() => { resolve() }), 5)
                arr[index].style.height = arr[index - 1].style.height;
                arr[index].style.background = '#a8dadc'
                arr[index - 1].style.background = '#a8dadc'
                index--;
            }
            arr[start].style.height = value;

            // Update all the pointers
            start++;
            mid++;
            start2++;
        }
    }
}

/* l is for left index and r is right index of the
   sub-array of arr to be sorted */
async function mergeSort(arr, l, r) {
    if (l < r) {

        // Same as (l + r) / 2, but avoids overflow
        // for large l and r
        let m = parseInt(l + (r - l) / 2);

        // Sort first and second halves
        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);

        await merge(arr, l, m, r);
    }
}