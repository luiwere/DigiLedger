document.addEventListener('DOMContentLoaded', function () {
  // fade in elements
  setTimeout(()=>{
    document.querySelectorAll('.fade-in, .hero, .features, .contact').forEach(el=>el.classList.add('visible'))
  },80)

  // animate numbers
  const nums = document.querySelectorAll('.num')
  nums.forEach(span => {
    const target = Number(span.getAttribute('data-target')) || 0
    let current = 0
    const duration = 1200
    const stepTime = Math.max(20, Math.floor(duration / Math.max(1, target)))
    const step = () => {
      current += Math.max(1, Math.floor(target / (duration / stepTime)))
      if (current >= target) {
        span.textContent = target.toLocaleString()
      } else {
        span.textContent = current.toLocaleString()
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  })

  // money multiplying animation
  const burstContainer = document.querySelector('.money-animation')
  if (burstContainer) {
    for (let i = 0; i < 6; i += 1) {
      const particle = document.createElement('span')
      particle.className = 'money-particle'
      particle.textContent = '💵'
      particle.style.setProperty('--x', `${(i - 2.5) * 18}px`)
      burstContainer.appendChild(particle)
      setTimeout(() => particle.classList.add('animate'), i * 180)
    }
  }

  // subtle highlight for CTA
  const cta = document.querySelector('.cta .btn.large')
  if (cta) {
    cta.addEventListener('mouseover', ()=>cta.style.transform='translateY(-3px)')
    cta.addEventListener('mouseout', ()=>cta.style.transform='none')
  }
})
