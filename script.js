// buyButtons and Hero Button to open the modal
const modal = document.getElementById('ticketModal');
const closeBtn = document.getElementById('modalCloseBtn');
const buyButtons = document.querySelectorAll('.btn-buy');
const heroButton = document.querySelector('.btn-primary');
const formStatus = document.querySelector('.contact-form-status');
heroButton.addEventListener('click', () => {
    modal.classList.add('active');
    });
buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.add('active');
        });
    });
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});
window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
});
// Contact Form Submission with GET request
  const form = document.getElementById('contact-form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Будь ласка, заповніть усі поля.';
      formStatus.style.color = '#db1839';
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/i;
    if (!emailPattern.test(email)) {
      formStatus.textContent = 'Невірний формат email.';
      formStatus.style.color = '#db1839';
      return;
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: new FormData(form),
      });

      if (response.ok) {
        formStatus.textContent = 'Дякуємо! Повідомлення надіслано.';
        formStatus.style.color = 'lightgreen';
        form.reset();
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
      } else {
        formStatus.textContent = 'Помилка відправки. Спробуйте ще раз.';
        formStatus.style.color = '#db1839';
      }
    } catch (error) {
      formStatus.textContent = 'Сервер не відповідає. Спробуйте пізніше.';
      formStatus.style.color = '#db1839';
    }
  });