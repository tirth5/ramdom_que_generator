main_frame = document.getElementById("main_frame").innerHTML;

function gen() {
    var user_name = document.getElementById("user_name").value
    if(user_name == "") {
        return;
    }
    var rating = document.getElementById("rating").value
    var url = "https://codeforces.com/api/problemset.problems"
    var url_user_status = "https://codeforces.com/api/user.status?handle=";
    url_user_status += user_name;
    url_user_status += "&from=1";
    var can = []
    var done = []
    var good = []
    fetch(url).then((response) =>{
        if (!response.ok) {
            return Promise.reject("Sorry");
        }
        return response.json()
    }).then((data) => {
       
        for(let i = 0; i < data.result.problems.length; i++) {
            if(data.result.problems[i].rating == rating) {
                can.push(data.result.problems[i])
            }
        }
        fetch(url_user_status).then((response) =>{
            if (!response.ok) {
                return Promise.reject("Sorry");
            }
            
            return response.json();
        }).then((data) => {
            let mp = new Map();
            for(let i = 0; i < data.result.length; i++) {
                if(data.result[i].problem.rating == rating && data.result[i].verdict == "OK") {
                   done.push(data.result[i].problem.contestId + data.result[i].problem.index);
                   mp.set(data.result[i].problem.contestId + data.result[i].problem.index, 1)
                }
            }
            for(let i = 0; i < can.length; i++) {
               let tar = can[i].contestId + can[i].index;
               if(mp.has(tar) == false) {
                 good.push(can[i]);
               }
            }
            if(good.length > 0) {
                let min = 0;
                let max = good.length;
                const a = Math.floor(Math.random() * (max - min + 1)) + min;
                let prob_url = "https://codeforces.com/problemset/problem/";
                prob_url += good[a].contestId;
                prob_url += "/";
                prob_url += good[a].index;
                
                let frame = ` 
                <div class="mt-8 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style="background-color: black; color: white">
                <p class="mb-3 font-normal">Problem ${good[a].index} : ${good[a].name}</p>
                <a href="${prob_url}" class="inline-flex items-center text-blue-600 hover:underline">
                    <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                </a>
                </div>`;
                document.getElementById("main_frame").innerHTML = mainframe + frame;
            } else {
                let frame = ` 
                <div class="mt-8 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style="background-color: black; color: white">
                <p class="mb-3 font-normal ">Not found any problem</p>
                <a href="#" class="inline-flex items-center text-blue-600 hover:underline">
                    <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                </a>
                </div>`;
                document.getElementById("main_frame").innerHTML = mainframe + frame;
            }  
        })
    })  
}