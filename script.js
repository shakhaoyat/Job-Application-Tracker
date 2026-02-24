// Job Application Tracker Script

// Sample jobs data (you can add more or load from localStorage)
let jobs = [
      {
            id: 1,
            company: 'Mobile First Corp',
            position: 'React Native Developer',
            location: 'Remote',
            jobType: 'Full-time',
            salary: '$130,000 - $175,000',
            status: 'NOT APPLIED',
            description: 'Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.'
      },
      {
            id: 2,
            company: 'Tech Solutions Inc',
            position: 'Full Stack Developer',
            location: 'Remote',
            jobType: 'Full-time',
            salary: '$120,000 - $160,000',
            status: 'NOT APPLIED',
            description: 'Join our dynamic team to build scalable web applications using modern tech stack including React, Node.js, and PostgreSQL.'
      },
      {
            id: 3,
            company: 'Startup Hub',
            position: 'Frontend Engineer',
            location: 'Hybrid',
            jobType: 'Full-time',
            salary: '$100,000 - $140,000',
            status: 'NOT APPLIED',
            description: 'Create beautiful and responsive user interfaces using React, TypeScript, and modern CSS frameworks for our fast-growing startup.'
      }
];

// Update stats
function updateStats() {
      const total = jobs.length;
      const interviewCount = jobs.filter(job => job.status === 'INTERVIEW').length;
      const rejectedCount = jobs.filter(job => job.status === 'REJECTED').length;

      document.getElementById('total').textContent = total;
      document.getElementById('interviewCount').textContent = interviewCount;
      document.getElementById('rejectedCount').textContent = rejectedCount;
      document.getElementById('jobCount').textContent = total;
}

// Toggle filter button styles
function toggleFilter(btnId) {
      // Reset all buttons
      const buttons = ['all-filter-btn', 'interview-filter-btn', 'rejected-filter-btn'];
      buttons.forEach(id => {
            const btn = document.getElementById(id);
            if (id === btnId) {
                  btn.className = 'bg-blue-600 text-white px-6 py-2 rounded-lg mr-2 font-medium';
            } else {
                  btn.className = 'bg-white text-gray-700 px-6 py-2 rounded-lg mr-2 border border-gray-200 font-medium';
            }
      });

      // Filter jobs based on button
      filterJobs(btnId);
}

// Filter jobs
function filterJobs(btnId) {
      const allCards = document.querySelectorAll('#allCards .card');

      allCards.forEach((card, index) => {
            const status = jobs[index].status;

            if (btnId === 'all-filter-btn') {
                  card.style.display = 'block';
            } else if (btnId === 'interview-filter-btn') {
                  card.style.display = status === 'INTERVIEW' ? 'block' : 'none';
            } else if (btnId === 'rejected-filter-btn') {
                  card.style.display = status === 'REJECTED' ? 'block' : 'none';
            }
      });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function () {
      updateStats();

      // Add event listeners to all interview buttons
      const interviewBtns = document.querySelectorAll('.interview-btn');
      interviewBtns.forEach((btn, index) => {
            btn.addEventListener('click', function () {
                  jobs[index].status = 'INTERVIEW';
                  updateJobCard(index);
                  updateStats();
            });
      });

      // Add event listeners to all rejected buttons
      const rejectedBtns = document.querySelectorAll('.rejected-btn');
      rejectedBtns.forEach((btn, index) => {
            btn.addEventListener('click', function () {
                  jobs[index].status = 'REJECTED';
                  updateJobCard(index);
                  updateStats();
            });
      });

      // Add event listeners to delete buttons
      const deleteBtns = document.querySelectorAll('.btn-delete');
      deleteBtns.forEach((btn, index) => {
            btn.addEventListener('click', function () {
                  if (confirm('Are you sure you want to delete this job?')) {
                        const card = this.closest('.card');
                        card.remove();
                        jobs.splice(index, 1);
                        updateStats();
                  }
            });
      });
});

// Update job card status
function updateJobCard(index) {
      const cards = document.querySelectorAll('#allCards .card');
      const statusBadge = cards[index].querySelector('.status');
      const status = jobs[index].status;

      // Update badge color and text
      statusBadge.textContent = status;

      if (status === 'INTERVIEW') {
            statusBadge.className = 'status inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded uppercase';
      } else if (status === 'REJECTED') {
            statusBadge.className = 'status inline-block px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded uppercase';
      } else {
            statusBadge.className = 'status inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded uppercase';
      }
}
