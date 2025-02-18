// Async functions and Await keyword
// async function fetchData() {
//     return 'data';
// }

// const dataPromise = fetchData();
// console.log(dataPromise);

// Resolving promise using then
// dataPromise.then((data) => {
//     console.log(data);
// })

// Using await
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise Resolved");
    }, 2000)
})

// normal sync resolve...
// function fetchData() {
//     // JS engine will not wait for the promise to resolve
//     promise.then((res) => {
//         console.log(res);
//     })
//     console.log("Create impact") // ---> This runs before resolving the promise
// }
// fetchData();

// ASYNC function resolve...
// async function awaitFetchData() {
//     const val = await promise; // await can only be used inside an async function
//     console.log(val);
//     console.log("Create impact") // ---> This runs only after resolving the promise
// }
// awaitFetchData();

// Multiple promises handling...
async function awaitMultiplePromises() {
    const val = await promise;
    console.log(val);
    console.log("Create impact 1");

    const val2 = await promise;
    console.log(val2);
    console.log("Create impact 2");
}

// awaitMultiplePromises();

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise resolved 2");
    }, 2000)
})

async function awaitMultipleDifferentPromises() {
    const val = await promise;
    console.log(val);
    console.log("Create impact 1");

    const val2 = await promise2;
    console.log(val2);
    console.log("Create impact 2");
}

awaitMultipleDifferentPromises();