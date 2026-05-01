import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CateringService');

  scrollToSection(sectionId: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  submitContactForm() {
    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const eventDetails = (document.getElementById("eventDetails") as HTMLTextAreaElement).value.trim();
    const messageDiv = document.getElementById("formMessage");

    if (!messageDiv) return;

    // Validate form fields
    if (!name || !email || !eventDetails) {
      messageDiv.textContent = "❌ Please fill all fields";
      messageDiv.className = "form-message error";
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      messageDiv.textContent = "❌ Please enter a valid email";
      messageDiv.className = "form-message error";
      return;
    }

    // Prepare the message
    const message = `Hello Radha's Kitchen!\n\nName: ${name}\nEmail: ${email}\n\nEvent Details:\n${eventDetails}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappPhone = "7981030850"; // Your WhatsApp number

    // Send via WhatsApp
    const whatsappURL = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
    
    // Send via Email (using mailto)
    const emailSubject = encodeURIComponent("New Catering Request from " + name);
    const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nEvent Details:\n${eventDetails}`);
    const emailURL = `mailto:radhaskitchenwgl@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    // Show success message
    messageDiv.textContent = "✅ Request submitted! Opening WhatsApp & Email...";
    messageDiv.className = "form-message success";

    // Open both WhatsApp and Email
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      setTimeout(() => {
        window.location.href = emailURL;
      }, 500);
    }, 1000);

    // Clear form after submission
    setTimeout(() => {
      const form = document.getElementById("contactForm") as HTMLFormElement;
      if (form) {
        form.reset();
      }
      messageDiv.textContent = "";
    }, 3000);
  }
}
