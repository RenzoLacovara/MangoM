const form = document.getElementById('changePasswordForm')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}

  data.forEach((value, key) => {
    obj[key] = value
  })

  fetch('/api/jwt/forgot-password', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((result) => {
      if (result.status === 200) {
        result.json()
        alert('Password changed successfully')
        window.location.replace('/users/login')
      } else {
        alert(`Error changing password`)
      }
    })
    .then((json) => console.log(json))
})
