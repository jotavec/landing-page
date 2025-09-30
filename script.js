// Initialize Animate On Scroll (AOS)
AOS.init({
  duration: 800,
  once: true,
  offset: 50,
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Pricing Toggle Logic
  const monthlyBtn = document.getElementById('monthly-btn');
  const yearlyBtn = document.getElementById('yearly-btn');
  const priceContainers = document.querySelectorAll('.price-container');
  const proLink = document.getElementById('professional-plan-link');
  const entLink = document.getElementById('enterprise-plan-link');
  const yearlyBonus = document.querySelector('.yearly-bonus');

  // Stripe Checkout Links
  const stripeLinks = {
      pro: {
          monthly: "https://buy.stripe.com/aFa28qcpv9Nh6kN7WpcZa02",
          yearly: "https://buy.stripe.com/00w7sK617gbF6kNdgJcZa05"
      },
      ent: {
          monthly: "https://buy.stripe.com/bJe28qahn1gLeRj7WpcZa03",
          yearly: "https://buy.stripe.com/7sY14m1KRgbF6kN0tXcZa04"
      }
  };

  function updatePrices(billingPeriod) {
      priceContainers.forEach(container => {
          const priceValueEl = container.querySelector('.price-value');
          const priceDescEl = container.querySelector('.price-desc');
          
          if (billingPeriod === 'monthly') {
              priceValueEl.textContent = container.dataset.monthlyPrice;
              priceDescEl.textContent = 'Cobrança mensal';
          } else { // yearly
              priceValueEl.textContent = container.dataset.yearlyPrice;
              const yearlyTotal = (parseFloat(container.dataset.yearlyPrice.replace(',', '.')) * 12).toFixed(2).replace('.', ',');
              priceDescEl.textContent = `Cobrado R$ ${yearlyTotal} de uma vez`;
          }
      });

      // Update Stripe links and show/hide yearly bonus
      if (billingPeriod === 'monthly') {
          proLink.href = stripeLinks.pro.monthly;
          entLink.href = stripeLinks.ent.monthly;
          if(yearlyBonus) yearlyBonus.style.display = 'none';
      } else { // yearly
          proLink.href = stripeLinks.pro.yearly;
          entLink.href = stripeLinks.ent.yearly;
          if(yearlyBonus) yearlyBonus.style.display = 'flex';
      }
  }

  monthlyBtn.addEventListener('click', () => {
      monthlyBtn.classList.add('active');
      yearlyBtn.classList.remove('active');
      updatePrices('monthly');
  });

  yearlyBtn.addEventListener('click', () => {
      yearlyBtn.classList.add('active');
      monthlyBtn.classList.remove('active');
      updatePrices('yearly');
  });

  // Initialize with yearly prices shown
  updatePrices('yearly');

  // FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const arrow = item.querySelector('.faq-arrow');

      question.addEventListener('click', () => {
          const isOpen = answer.style.display === 'block';
          
          // Close all other open answers
          faqItems.forEach(otherItem => {
              if (otherItem !== item) {
                  otherItem.querySelector('.faq-answer').style.display = 'none';
                  otherItem.querySelector('.faq-arrow').classList.remove('rotate-180');
              }
          });

          // Toggle the clicked answer
          answer.style.display = isOpen ? 'none' : 'block';
          arrow.classList.toggle('rotate-180');
      });
  });
});

