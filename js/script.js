document.querySelector(".button-container").addEventListener("click", () => {
    let text = document.getElementById("filter-jobs").value;
    getJobs().then(jobs => {
        let filteredJobs = this.filterJobs(jobs, text);
        this.showJobs(filteredJobs)
    });
});

function getJobs() {
    return fetch('data.json')
        .then(response => response.json())
        .then(data => data);
}

function filterJobs(jobs, searchText) {
    if (searchText) {
        let search = searchText.toLowerCase().trim();
        let filteredJobs = jobs.filter(job => {
            if (job.roleName.toLowerCase().includes(search) ||
                job.type.toLowerCase().includes(search) ||
                job.company.toLowerCase().includes(search) ||
                job.requirements.content.toLowerCase().includes(search)
            ) {
                return true;
            }
            return false;
        });
        return filteredJobs;
    }
    return jobs;


}

function search(ele) {
    if (event.key === 'Enter') {
        let text = ele.value;
        getJobs().then(jobs => {
            let filteredJobs = this.filterJobs(jobs, text);
            this.showJobs(filteredJobs)
        });
    }
}

function showJobs(jobs) {
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML = "";
    jobs.forEach(job => {
        jobsHTML += `
            <div class="job-tile">
                <div class="top">
                    <img src="${job.logo}" alt="" srcset="">
                    <span class="material-icons more_horiz">more_horiz</span>
                </div>
                <div class="rolename">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>${job.requirements.content}</span>
                </div>
                <div class="buttons">
                    <div class="button apply-now">Apply Now</div>
                    <div class="button">Message</div>
                </div>
            </div>
        `
    });

    jobsContainer.innerHTML = jobsHTML;
}

// When the application is loaded
getJobs().then(data => showJobs(data));