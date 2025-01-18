// Explanation for prefix naming scheme
// s = storage = localStorage
// g = global varable
// v = view = the html page
// x2y = move data from layer x to layer y
// on = html event handler
// h = html element

// gModel contains all model variables to make localStorage easier.
const LS_MODEL = "model";   // Local storage key
let gModel = {
    bucket: [],     // List of all activities
    filter: false   // Filter out all accomplished activities
};       

storage2model();
model2view();

document.querySelector("#btnSubmit").addEventListener("click", onActivityAdd);
document.querySelector("#chkFilter").addEventListener("click", onFilter);


function onFilter(e) {
    // View to model
    gModel.filter = e.target.checked;
    model2view();
    model2storage();
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
    gModel.bucket.push(activity);
    // Sort the bucket list first by category and then by name. 
    // Convert bool to number with the minus sign.
    // 1 + 2 * -true = -1
    // 1 + 2 * -false = 1
    gModel.bucket.sort((a, b) =>
        a.category !== b.category ?
            1 + 2 * -(a.category < b.category) :
            1 + 2 * -(a.name < b.name));
    // #endregion

    model2view();
    model2storage();
}

function onActivityRemove(e) {
    e.preventDefault();

    // #region Update model
    const activity = e.target.parentElement.value;
    gModel.bucket.splice(gModel.bucket.indexOf(activity), 1);
    // #endregion

    model2view();
    model2storage();
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

    model2view();
    model2storage();
}

function onActivityDone(e) {
    // #region Update model
    const activity = e.target.parentElement.value;
    activity.done = !activity.done;
    // #endregion

    model2storage();
}

function storage2model() {
    const m = localStorage.getItem(LS_MODEL);
    if (m !== null)
        gModel = JSON.parse(m);
}

function model2view() {
    const hBucket = document.querySelector("#bucketList");

    // Remove the old list
    while (hBucket.firstChild) {
        hBucket.removeChild(hBucket.firstChild);
    }

    // #region Add the new list
    let category = "";
    for (const activity of gModel.bucket) {
        if (!gModel.filter || !activity.done) {
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
    // #endregion

    const hFilter = document.querySelector("#chkFilter");
    hFilter.checked = gModel.filter;
}

function model2storage() {
    localStorage.setItem(LS_MODEL, JSON.stringify(gModel));
}
