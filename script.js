// Explanation for function prefix naming scheme
// s = storage = localStorage
// m = model = gBucket
// v = view = the html page
// x2y = move data from layer x to layer y
// on = html event handler function
// test = test function

const LS_BUCKETLIST = "bucketlist"; // Local storage name

let gBucket = [];
storage2model();
model2view();

document.querySelector("#btnSubmit").addEventListener("click", onActivityAdd);


function onActivityAdd(e) {
    e.preventDefault();
    const form = document.querySelector("#bucketForm");
    if (!form.reportValidity())
        return;

    // Update model
    const hName = document.querySelector("#activityName");
    const name = hName.value;
    hName.value = "";
    const hCategory = document.querySelector("#activityCategory");
    const category = hCategory.value;
    hCategory.selectedIndex = 0;
    const activity = {
        name: name,
        category: category,
        done: false
    };
    gBucket.push(activity);
    // Sort the bucket list first by category and then by name. 
    // Converts bool to number with the minus sign.
    // 1 + 2 * -true = -1
    // 1 + 2 * -false = 1
    gBucket.sort((a, b) =>
        a.category !== b.category ?
            1 + 2 * -(a.category < b.category) :
            1 + 2 * -(a.name < b.name));

    model2view();

    model2storage();
}

function onActivityRemove(e) {
    e.preventDefault();

    // Update model
    const activity = e.target.parentElement.value;
    gBucket.splice(gBucket.indexOf(activity), 1);

    model2view();

    model2storage();
}

function onActivityDone(e) {
    // Update model
    const activity = e.target.parentElement.value;
    activity.done = !activity.done;

    model2storage();
}

function model2view() {
    function m2vCategory(hParent, category) {
        const hDiv = document.createElement("div");
        hDiv.classList = "category";
        hParent.appendChild(hDiv);

        const hCategory = document.createElement("h2");
        hCategory.innerText = category;
        hDiv.appendChild(hCategory);
    }

    function m2vActivity(hParent, activity) {
        const hActivity = document.createElement("div");
        hActivity.value = activity;
        hActivity.classList = "activity";
        hParent.appendChild(hActivity);

        const hSpan = document.createElement("span");
        hSpan.innerText = activity.name;
        hActivity.appendChild(hSpan);

        const hDone = document.createElement("input");
        hDone.type = "checkbox";
        hDone.checked = activity.done;
        hDone.addEventListener("click", onActivityDone);
        hActivity.appendChild(hDone);

        const hRemove = document.createElement("button");
        hRemove.type = "submit";
        hRemove.innerText = "Ta bort";
        hRemove.addEventListener("click", onActivityRemove);
        hActivity.appendChild(hRemove);
    }

    const hBucket = document.querySelector("#bucketList");

    // Remove the old list
    while (hBucket.firstChild) {
        hBucket.removeChild(hBucket.firstChild);
    }

    // Add the new list
    let category = "";
    for (const activity of gBucket) {
        if (category !== activity.category) {
            category = activity.category;
            m2vCategory(hBucket, category)
        }
        m2vActivity(hBucket, activity);
    }
}

function storage2model() {
    const bl = localStorage.getItem(LS_BUCKETLIST);
    if (bl !== null)
        gBucket = JSON.parse(bl);
}

function model2storage() {
    localStorage.setItem(LS_BUCKETLIST, JSON.stringify(gBucket));
}

function testAddData() {
    function addActivity(hName, hCategory, hAdd, name, categoryIndex) {
        hName.value = name;
        hCategory.selectedIndex = categoryIndex;
        hAdd.click();
    }
    const hName = document.querySelector("#activityName");
    const hCategory = document.querySelector("#activityCategory");
    const hAdd = document.querySelector("#btnSubmit");
    addActivity(hName, hCategory, hAdd, "Resa till månen", 0);
    addActivity(hName, hCategory, hAdd, "Resa till Skövde", 0);
    addActivity(hName, hCategory, hAdd, "Spela DnD", 1);
    addActivity(hName, hCategory, hAdd, "Spela Shadowrun", 1);
    addActivity(hName, hCategory, hAdd, "Penningpolitik", 2);
    addActivity(hName, hCategory, hAdd, "Kvantfysik", 2);
    addActivity(hName, hCategory, hAdd, "Oljemålning", 3);
    addActivity(hName, hCategory, hAdd, "Samla frimärken", 3);
}