// -------------------- GLOBAL STYLING ---------------------------------
// These data attributes are separate and unaffected by styling classes
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')

const overlay = document.getElementById('overlay')

overlay && overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

// -------------------- HOME PAGE ---------------------------------
const baseUrl = "http://localhost:4598";

// -------------------- TICKETS ---------------------------------
// -------------------- EVENTS ---------------------------------
// -------------------- EMPLOYEES ---------------------------------
// -------------------- FANS ---------------------------------
const fanForm = document.getElementById('fan-form')

fanForm && fanForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    // console.log(fanForm.elements);
    let context = {
        firstName: fanForm.elements.firstName.value, 
        lastName: fanForm.elements.lastName.value, 
        gender: fanForm.elements.gender.value, 
        birthdate: fanForm.elements.birthdate.value, 
        phone: fanForm.elements.phone.value, 
        email: fanForm.elements.email.value, 
        membership: fanForm.elements.membership.value,  
        comment: fanForm.elements.comment.value,
    }

    const res = await axios.post(`${baseUrl}/fans`, context);
    const rows = res.data.rows;
    console.log(rows);
})



// -------------------- EVENTS_FANS ---------------------------------
// -------------------- JOB_TITLES ---------------------------------
// -------------------- EMPLOYEE_JOB_TITLES ---------------------------------
