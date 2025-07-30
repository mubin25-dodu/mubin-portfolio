document.addEventListener('DOMContentLoaded', function () {
  const dropdownButton = document.querySelector('#dropdown button');
  const dropdownContent = document.querySelector('#dropdown-content');

  dropdownButton.addEventListener('click', function () {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  });

  const menuButton = document.getElementById('menu-button');
  const nav2 = document.getElementById('nav2');

  menuButton.addEventListener('click', function () {
    nav2.classList.toggle('show');
  });

  function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} years, ${months} months, and ${days} days`;
  }

  const ageElement = document.getElementById('age');
  if (ageElement) {
    ageElement.textContent = calculateAge('2001-06-30');
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Md Abdullah Al Mubin",
    "jobTitle": "Computer Science and Engineering Student",
    "affiliation": {
      "@type": "Organization",
      "name": "American International University-Bangladesh (AIUB)"
    },
    "url": "https://github.com/mubin25-dodu",
    "sameAs": [
      "https://www.facebook.com/abdullahalmubin69",
      "https://www.instagram.com/abdullahalmubin69",
      "https://www.linkedin.com/in/abdullah-al-mubin9516"
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
});

document.addEventListener('scroll', function () {
  const nav3 = document.getElementById('nav3');
  nav3.style.top = window.scrollY > 100 ? '-60px' : '50px';
});

function addClass() {
  document.body.classList.add("sent");
}

document.getElementById("sendLetter").addEventListener("click", addClass);
function sendmail() {
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("Email").value,
    message: document.getElementById("message").value,
  }
    emailjs.send("service_0jgffj7", "template_89vfg5n", params).then(alert("success"));
  }
