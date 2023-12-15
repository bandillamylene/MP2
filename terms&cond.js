const setTermsAndConditions = () => {
    const termsContent = `
        <h4>Terms and Conditions of Use</h4>
        <p>Welcome to Throttle Twist's website. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions of use. If you disagree with any part of these terms, please do not use our website.</p>
        <ul>
            <li>
                <h5>Use of the Website</h5>
                <p>The content of this website is for general information and use only. It is subject to change without notice.</p>
                <p>Your use of any information or materials on this website is entirely at your own risk. We are not liable for any inaccuracies, errors, or omissions in the content provided.</p>
                <p>This website may contain material which is owned by or licensed to us. Reproduction of any content is prohibited without prior written consent.</p>
            </li>
            <li>
                <h5>Vehicle Information and Pricing</h5>
                <p>The information about motorcycles, including specifications, prices, and availability, is subject to change without notice.</p>
                <p>While we make every effort to ensure the accuracy of the information provided, we do not guarantee that all details are accurate, complete, or current. Please contact us directly for the most up-to-date information.</p>
            </li>
            <li>
                <h5>Online Purchases</h5>
                <p>Any purchase made through this website is subject to availability and our sales terms and conditions.</p>
                <p>We reserve the right to cancel or refuse any order placed based on incorrect pricing or availability information.</p>
            </li>
            <li>
                <h5>Privacy Policy</h5>
                <p>Your use of this website is also governed by our Privacy Policy, which outlines how we collect, use, and disclose your information. By using this website, you consent to the data practices outlined in the Privacy Policy.</p>
            </li>
            <li>
                <h5>Limitation of Liability</h5>
                <p>In no event will we be liable for any loss or damage, including indirect or consequential loss or damage, arising from the use of this website.</p>
                <p>We shall not be responsible for any technical issues, interruptions, or viruses that may infect your computer equipment or other property due to your use of this website.</p>
            </li>
            <li>
                <h5>Links to Other Websites</h5>
                <p>This website may contain links to other websites. These links are provided for your convenience to provide further information. We do not endorse the linked websites and have no responsibility for their content.</p>
            </li>
            <li>
                <h5> Changes to Terms and Conditions</h5>
                <p> We reserve the right to modify these terms and conditions at any time. Your continued use of the website after any changes indicates your acceptance of the modified terms.</p>
            </li>
            <li>
                <h5> Governing Law</h5>
                <p> These terms and conditions shall be governed by and construed in accordance with the laws of the Philippines, and any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of the Republic of the Philippines.</p>
            </li>
        </ul>

        <p>By using this website, you agree to these terms and conditions. If you have any questions or concerns about these terms, please contact us.</p>
    `;
    
    document.getElementById('termsModalBody').innerHTML = termsContent;
};

document.getElementById('termsLink').addEventListener('click', () => {
    setTermsAndConditions();
    const modal = new bootstrap.Modal(document.getElementById('termsModal'));
    modal.show();
});
