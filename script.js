const bucket = [];
const btnSubmit = document.querySelector("#bucketForm button");
btnSubmit.addEventListener("click", eventAdd);

function eventAdd() {
    console.log("click event");
    const name = document.querySelector("#activityName").value;
    const category = document.querySelector("#activityCategory").value;
    const activity = {
        name: name,
        category: category,
        done: false
    }
    bucket.push(activity);
    addActivity(activity);
}

function drawBucket() {
    const hBucket = document.querySelector("#bucketList");
    hBucket.innerHTML = "";
    for (const activity of bucket)
        addActivity(activity);
}

function addActivity(activity) {
    const hBucket = document.querySelector("#bucketList");
    const hActivity = document.createElement("div");
    hActivity.innerHTML = 
        activity.name + " " + activity.category 
        + "<input type='checkbox' onclick='eventDone(this)' value='" + activity.done + "'></input>" 
        + "<button onclick='eventRemove(this)'>Ta bort</button>";
    hBucket.appendChild(hActivity);
}

function eventRemove(e) {
    console.log(e);
}

function eventDone(e) {
    console.log(e);
}
