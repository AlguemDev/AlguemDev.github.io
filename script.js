const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

function openTab(tabId) {
  const target = document.getElementById(tabId);

  if (!target || !target.classList.contains("tab-content")) {
    return;
  }

  tabButtons.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.tab === tabId
    );
  });

  tabContents.forEach(content => {
    content.classList.toggle(
      "active",
      content.id === tabId
    );
  });

  if (tabId === "trabalho") {
    observeReveals();
  }
}

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    openTab(button.dataset.tab);
  });
});

document.querySelectorAll("[data-tab-link]").forEach(link => {
  link.addEventListener("click", () => {
    openTab(link.dataset.tabLink);
  });
});

document.querySelectorAll("[data-footer-tab]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    openTab(link.dataset.footerTab);

    window.scrollTo({
      top: document.querySelector(".profile-tabs").offsetTop - 75,
      behavior: "smooth"
    });
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.08
});

function observeReveals() {
  document.querySelectorAll(".reveal:not(.visible)").forEach(element => {
    revealObserver.observe(element);
  });
}

observeReveals();

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    openTab("informacoes");
  }
});
