// Synchronous programming run code example
const task1 = () => {
    console.log('Task 1');
}

const heavyTask = () => {
    console.log('Heavy Task started in sync manner');
    const start = Date.now();// epoch time
    while (Date.now() - start < 3000) {
        // do nothing
    }
    console.log('Heavy Task done');
}

const heavyTaskNotBlocking = () => {
    console.log("async Task skipping it for now")
    setTimeout(() => {
        console.log("async task done")
    }, 3000);
}

const task2 = () => {
    console.log('Task 2');
}

// task1();
// heavyTask();
// heavyTaskNotBlocking();
// task2();

const data = []
const fetchResponseBlocking = () => {
    console.log("making a sync api call ")
    // mimicking an api call
    const start = Date.now();
    while (Date.now() - start < 3000) {
        // do nothing
    }
    console.log("api call done")
    data.push({ id: 1, name: 'John' })
}

const fetchResponseNonBlocking = () => {
    console.log("making a sync api call ")
    // mimicking an api call
    setTimeout(() => {
        console.log("api call done")
        data.push({ id: 1, name: 'John' })
    }, 5000)
}

const fetchResponseNonBlockingWithCallback = (render) => {
    console.log("making a sync api call")
    setTimeout(() => {
        console.log("api call done");
        data.push({ id: 1, name: 'Arjun' })
        render();
    }, 5000)
}


const renderResponse = () => {
    console.log("rendering the response")
    console.log(data[0].name)
}

// fetchResponseBlocking()
// fetchResponseNonBlocking()
// renderResponse()

// task1();
// fetchResponseNonBlockingWithCallback(renderResponse);
// task2();