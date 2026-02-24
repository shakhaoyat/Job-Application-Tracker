// Job Application Tracker Script

let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');

function calculateCount() {
      total.innerText = allCardSection.children.length;
      interviewCount.innerText = interviewList.length;
      rejectedCount.innerText = rejectedList.length;
}

calculateCount();

// Toggle filter button styles
function toggleFilter(id) {
      // Adding gray bg for all
      allFilterBtn.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-200');
      interviewFilterBtn.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-200');
      rejectedFilterBtn.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-200');

      // If any button has blue then remove
      allFilterBtn.classList.remove('bg-blue-600', 'text-white');
      interviewFilterBtn.classList.remove('bg-blue-600', 'text-white');
      rejectedFilterBtn.classList.remove('bg-blue-600', 'text-white');

      const selected = document.getElementById(id);
      currentStatus = id;

      // Adding blue bg for current button
      selected.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-200');
      selected.classList.add('bg-blue-600', 'text-white');

      // Show and hide particular section
      if (id == 'interview-filter-btn') {
            allCardSection.classList.add('hidden');
            filterSection.classList.remove('hidden');
            renderInterview();
      } else if (id == 'all-filter-btn') {
            allCardSection.classList.remove('hidden');
            filterSection.classList.add('hidden');
      } else if (id == 'rejected-filter-btn') {
            allCardSection.classList.add('hidden');
            filterSection.classList.remove('hidden');
            renderRejected();
      }
}

// Event delegation
mainContainer.addEventListener('click', function (event) {
      if (event.target.classList.contains('interview-btn')) {
            const parentNode = event.target.parentNode.parentNode;

            const companyName = parentNode.querySelector('.companyName').innerText;
            const position = parentNode.querySelector('.position').innerText;
            const location = parentNode.querySelector('.location').innerText;
            const jobType = parentNode.querySelector('.jobType').innerText;
            const salary = parentNode.querySelector('.salary').innerText;
            const notes = parentNode.querySelector('.notes').innerText;

            parentNode.querySelector('.status').innerText = 'INTERVIEW';
            parentNode.querySelector('.status').className = 'status inline-block py-2 pb-5 rounded-sm bg-teal-50 text-teal-700 w-[130px] font-medium mb-2 text-center';

            const cardInfo = {
                  companyName,
                  position,
                  location,
                  jobType,
                  salary,
                  status: 'INTERVIEW',
                  notes
            };

            const jobExist = interviewList.find(item => item.companyName == cardInfo.companyName);

            if (!jobExist) {
                  interviewList.push(cardInfo);
            }

            // Removing the job from rejected list
            rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName);

            // After remove rerender the html
            if (currentStatus == 'rejected-filter-btn') {
                  renderRejected();
            }

            calculateCount();

      } else if (event.target.classList.contains('rejected-btn')) {
            const parentNode = event.target.parentNode.parentNode;

            const companyName = parentNode.querySelector('.companyName').innerText;
            const position = parentNode.querySelector('.position').innerText;
            const location = parentNode.querySelector('.location').innerText;
            const jobType = parentNode.querySelector('.jobType').innerText;
            const salary = parentNode.querySelector('.salary').innerText;
            const notes = parentNode.querySelector('.notes').innerText;

            parentNode.querySelector('.status').innerText = 'REJECTED';
            parentNode.querySelector('.status').className = 'status inline-block py-2 pb-5 rounded-sm bg-red-50 text-red-700 w-[130px] font-medium mb-2 text-center';

            const cardInfo = {
                  companyName,
                  position,
                  location,
                  jobType,
                  salary,
                  status: 'REJECTED',
                  notes
            };

            const jobExist = rejectedList.find(item => item.companyName == cardInfo.companyName);

            if (!jobExist) {
                  rejectedList.push(cardInfo);
            }

            // Removing the job from interview list
            interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName);

            // After remove rerender the html
            if (currentStatus == "interview-filter-btn") {
                  renderInterview();
            }
            calculateCount();
      }
});

// Render Interview jobs
function renderInterview() {
      filterSection.innerHTML = '';

      if (interviewList.length === 0) {
            filterSection.innerHTML = `
                  <div class="flex flex-col items-center justify-center py-16">
                        <img src="jobs.png" alt="No jobs" class="w-24 h-24 mb-4 opacity-50">
                        <h3 class="text-xl font-semibold text-gray-700 mb-2">No jobs available</h3>
                        <p class="text-gray-500">Check back later for new job opportunities</p>
                  </div>
            `;
            return;
      }

      for (let job of interviewList) {
            let div = document.createElement('div');
            div.className = 'card bg-white border border-gray-200 p-6 rounded-lg shadow-sm relative space-y-4';
            div.innerHTML = `
            <button class="btn-delete text-gray-400 hover:text-red-500 absolute top-4 right-4">
                <i class="fa-solid fa-trash-can"></i>
            </button>

            <div>
                <h3 class="companyName text-xl font-semibold text-[#1e3a8a] mb-1">${job.companyName}</h3>
                <p class="position text-gray-500 mb-3">${job.position}</p>
            </div>

            <div class="flex gap-2 text-sm text-gray-500 mb-3">
                <p class="location">${job.location}</p>
                <span>•</span>
                <p class="jobType">${job.jobType}</p>
                <span>•</span>
                <p class="salary">${job.salary}</p>
            </div>

            <div class="mb-5">
                <p class="status inline-block py-2 pb-5 rounded-sm bg-teal-50 text-teal-700 w-[130px] font-medium mb-2 text-center">${job.status}</p>
                <p class="notes mt-2 text-sm text-gray-600">${job.notes}</p>
            </div>

            <div class="flex items-center gap-3">
                <button class="interview-btn border-2 border-teal-500 text-teal-600 px-5 py-2 rounded font-semibold text-xs hover:bg-teal-50 uppercase">INTERVIEW</button>
                <button class="rejected-btn border-2 border-red-500 text-red-600 px-5 py-2 rounded font-semibold text-xs hover:bg-red-50 uppercase">REJECTED</button>
            </div>
        `;
            filterSection.appendChild(div);
      }
}

// Render Rejected jobs
function renderRejected() {
      filterSection.innerHTML = '';

      if (rejectedList.length === 0) {
            filterSection.innerHTML = `
                  <div class="flex flex-col items-center justify-center py-16">
                        <img src="jobs.png" alt="No jobs" class="w-24 h-24 mb-4 opacity-50">
                        <h3 class="text-xl font-semibold text-gray-700 mb-2">No jobs available</h3>
                        <p class="text-gray-500">Check back later for new job opportunities</p>
                  </div>
            `;
            return;
      }

      for (let job of rejectedList) {
            let div = document.createElement('div');
            div.className = 'card bg-white border border-gray-200 p-6 rounded-lg shadow-sm relative space-y-4';
            div.innerHTML = `
            <button class="btn-delete text-gray-400 hover:text-red-500 absolute top-4 right-4">
                <i class="fa-solid fa-trash-can"></i>
            </button>

            <div>
                <h3 class="companyName text-xl font-semibold text-[#1e3a8a] mb-1">${job.companyName}</h3>
                <p class="position text-gray-500 mb-3">${job.position}</p>
            </div>

            <div class="flex gap-2 text-sm text-gray-500 mb-3">
                <p class="location">${job.location}</p>
                <span>•</span>
                <p class="jobType">${job.jobType}</p>
                <span>•</span>
                <p class="salary">${job.salary}</p>
            </div>

            <div class="mb-5">
                <p class="status inline-block py-2 pb-5 rounded-sm bg-red-50 text-red-700 w-[130px] font-medium mb-2 text-center">${job.status}</p>

<p class="notes mt-2 text-sm text-gray-600">
  ${job.notes}
</p>
            </div>

            <div class="flex items-center gap-3">
                <button class="interview-btn border-2 border-teal-500 text-teal-600 px-5 py-2 rounded font-semibold text-xs hover:bg-teal-50 uppercase">INTERVIEW</button>
                <button class="rejected-btn border-2 border-red-500 text-red-600 px-5 py-2 rounded font-semibold text-xs hover:bg-red-50 uppercase">REJECTED</button>
            </div>
        `;
            filterSection.appendChild(div);
      }
}
