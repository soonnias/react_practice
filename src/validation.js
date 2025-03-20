export const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

export const validatePhone = (value) => {
  const phoneRegex = /^\+\d{2} \d{3}-\d{3}-\d{4}$/
  return phoneRegex.test(value)
}

export const validateUserData = (firstName, lastName, email, phone, age) => {
  if (!firstName || firstName.length < 2) {
    throw new Error('First name must be at least 2 characters long')
  }

  if (!lastName || lastName.length < 2) {
    throw new Error('Last name must be at least 2 characters long')
  }

  if (!validateEmail(email)) {
    throw new Error('Invalid email format')
  }

  if (!validatePhone(phone)) {
    throw new Error('Invalid phone format. Expected format: +99 999-999-9999')
  }

  if (!age || isNaN(age) || age <= 0 || age > 120) {
    throw new Error(
      'Invalid age format. Age must be a number between 1 and 120'
    )
  }
}
