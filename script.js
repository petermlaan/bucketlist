// Explanation for prefix naming scheme
// s = storage = localStorage
// m = model = m variables (global)
// g = global varable
// v = view = the html page
// x2y = move data from layer x to layer y
// on = html event handler
// h = html element

const LS_BUCKETLIST = "bucketlist"; // Local storage name

let mBucket = [];       // List of all activities

let gFilter = false;    // Filter out accomplished activities

s2mBucket();
m2vBucket();

document.querySelector("#btnSubmit").addEventListener("click", onActivityAdd);
document.querySelector("#chkFilter").addEventListener("click", onFilter);


function onFilter(e) {
    gFilter = e.target.checked;
    m2vBucket();
}

function onActivityAdd(e) {
    e.preventDefault();
    const form = document.querySelector("#bucketForm");
    if (!form.reportValidity())
        return;

    // #region Update model
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
    mBucket.push(activity);
    // Sort the bucket list first by category and then by name. 
    // Converts bool to number with the minus sign.
    // 1 + 2 * -true = -1
    // 1 + 2 * -false = 1
    mBucket.sort((a, b) =>
        a.category !== b.category ?
            1 + 2 * -(a.category < b.category) :
            1 + 2 * -(a.name < b.name));
    // #endregion

    m2vBucket();
    m2sBucket();
}

function onActivityRemove(e) {
    e.preventDefault();

    // #region Update model
    const activity = e.target.parentElement.value;
    mBucket.splice(mBucket.indexOf(activity), 1);
    // #endregion

    m2vBucket();
    m2sBucket();
}

function onActivityEdit(e) {
    e.preventDefault();
    e.target.innerText = "Spara"
    e.target.addEventListener("click", onActivitySave);
    e.target.parentElement.firstChild.firstChild.style.display = "inline";
}

function onActivitySave(e) {
    e.preventDefault();

    // #region View to model
    const hName = e.target.parentElement.firstChild.firstChild;
    const activity = e.target.parentElement.value;
    activity.name = hName.value;
    // #endregion

    m2vBucket();
    m2sBucket();
}

function onActivityDone(e) {
    // #region Update model
    const activity = e.target.parentElement.value;
    activity.done = !activity.done;
    // #endregion

    m2sBucket();
}

function s2mBucket() {
    const bl = localStorage.getItem(LS_BUCKETLIST);
    if (bl !== null)
        mBucket = JSON.parse(bl);
}

function m2vBucket() {
    const hBucket = document.querySelector("#bucketList");

    // Remove the old list
    while (hBucket.firstChild) {
        hBucket.removeChild(hBucket.firstChild);
    }

    // Add the new list
    let category = "";
    for (const activity of mBucket) {
        if (!gFilter || !activity.done) {
            if (category !== activity.category) {
                category = activity.category;
                // #region Add category
                const hDiv = document.createElement("div");
                hDiv.classList = "category";
                hBucket.appendChild(hDiv);

                const hCategory = document.createElement("h2");
                hCategory.innerText = category;
                hDiv.appendChild(hCategory);
                // #endregion
            }
            // #region Add activity
            // #region Main div
            const hActivity = document.createElement("div");
            hActivity.value = activity;
            hActivity.classList = "activity";
            hBucket.appendChild(hActivity);
            // #endregion

            // #region Name
            const hNameDiv = document.createElement("div");
            hActivity.appendChild(hNameDiv);
            const hName = document.createElement("input");
            hName.value = activity.name;
            hName.style.display = "none";
            hName.className = "name-edit";
            hNameDiv.appendChild(hName);
            const hSpan = document.createElement("span");
            hSpan.innerText = activity.name;
            hNameDiv.appendChild(hSpan);
            // #endregion

            // #region Done
            const hDone = document.createElement("input");
            hDone.type = "checkbox";
            hDone.checked = activity.done;
            hDone.addEventListener("click", onActivityDone);
            hActivity.appendChild(hDone);
            // #endregion

            // #region Edit
            const hEdit = document.createElement("button");
            hEdit.type = "submit";
            hEdit.innerText = "Ändra";
            hEdit.addEventListener("click", onActivityEdit);
            hActivity.appendChild(hEdit);
            // #endregion

            // #region Remove
            const hRemove = document.createElement("button");
            hRemove.type = "submit";
            hRemove.innerText = "Ta bort";
            hRemove.addEventListener("click", onActivityRemove);
            hActivity.appendChild(hRemove);
            // #endregion
            // #endregion
        }
    }
}

function m2sBucket() {
    localStorage.setItem(LS_BUCKETLIST, JSON.stringify(mBucket));
}
