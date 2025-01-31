import "./PrivacyPolicy.scss"

const PrivacyPolicy = () => {
    const today = new Date().toLocaleDateString();
    const email = "support@moodtune.com";

    return (
        <div className="privacy-policy">
            <h1 className="privacy-policy__title">MoodTune Privacy and Cookies Policy</h1>
            <p>Effective Date: {today}</p>
            
            <h2 className="privacy-policy__subtitle">1. Introduction</h2>
            <p>Welcome to MoodTune. Your privacy is important to us, and we are committed to protecting the personal information you share with us. This policy explains how we collect, use, store, and protect your data when using our service.</p>

            <h2 className="privacy-policy__subtitle">2. Data We Collect</h2>
            <p>When you use MoodTune, we collect and store information about your musical preferences to provide personalized recommendations. The collected data includes:</p>
            <ul className="list-disc list-inside">
                <li>Playlists saved in your Spotify account.</li>
                <li>Favorite songs and artists.</li>
                <li>Other musical information accessible through Spotify (based on granted permissions).</li>
            </ul>
            <p>This data is obtained directly from your Spotify account via its official API, and we only access the information you authorize us to share.</p>

            <h2 className="privacy-policy__subtitle">3. Use of Data</h2>
            <p>The collected data is used exclusively to enhance your experience on MoodTune by providing personalized playlist recommendations based on machine learning.</p>
            <p>We do not share, sell, or transfer your information to third parties.</p>

            <h2 className="privacy-policy__subtitle">4. Storage and Security</h2>
            <p>The collected data is stored in:</p>
            <ul className="list-disc list-inside">
                <li><strong>Cookies</strong>: We use cookies to improve your experience and keep your session active.</li>
                <li><strong>Database</strong>: We store information about your musical preferences to improve future recommendations.</li>
            </ul>
            <p>We take reasonable security measures to protect your information from unauthorized access, loss, or alteration.</p>

            <h2 className="privacy-policy__subtitle">5. Use of Cookies</h2>
            <p>MoodTune uses cookies to enhance the user experience. The cookies we use include:</p>
            <ul className="list-disc list-inside">
                <li><strong>Essential cookies</strong>: Necessary for the application's operation.</li>
                <li><strong>Personalization cookies</strong>: Store information about your preferences to offer a better experience.</li>
            </ul>
            <p>You can manage and delete cookies from your browser settings.</p>

            <h2 className="privacy-policy__subtitle">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside">
                <li>Access the data we collect about you.</li>
                <li>Request the deletion of your stored data.</li>
                <li>Revoke MoodTune's access to your Spotify account at any time from your Spotify account settings.</li>
            </ul>
            <p>To exercise these rights, you can contact us at {email}.</p>

            <h2 className="privacy-policy__subtitle">7. Policy Changes</h2>
            <p>We may update this privacy and cookies policy occasionally. Any significant changes will be notified through the application or via email.</p>

            <h2 className="privacy-policy__subtitle">8. Contact</h2>
            <p>If you have any questions about our privacy policy, you can write to us at {email}.</p>

            <hr className="my-6 border-gray-600" />
            <p>By using MoodTune, you accept the terms of this privacy and cookies policy.</p>
        </div>
    );
};

export default PrivacyPolicy;