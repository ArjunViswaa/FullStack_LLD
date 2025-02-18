function test1() {
    console.log("test 1");
}

const test2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("test 2");
    }, 3000);
})

function test3() {
    console.log("test 3")
}

async function getData() {
    const data = await test2;
    console.log(data);
}

test1();
getData();
test3();