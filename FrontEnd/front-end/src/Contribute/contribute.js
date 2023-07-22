import "./style.css";
function Contribute() {
    return (
        <div className="contribute-section">
            <h2 className="text-center mb-5">How to Contribute to QuestMatch</h2>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card contribute-card">
                        <div className="card-body text-center">
                            <i className="fas fa-code"></i>
                            <h4>Contribute to Code</h4>
                            <p>Help us improve the app by contributing to the codebase. Check out the GitHub repository and
                                submit pull requests with your code changes.</p>
                            <a href="https://github.com/porfanid/QuestMatch" target="_blank" rel="noreferrer">GitHub Repository</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card contribute-card">
                        <div className="card-body text-center">
                            <i className="fas fa-file-alt"></i>
                            <h4>Create Documentation</h4>
                            <p>Improve the project's documentation by adding or updating existing documentation to provide
                                clear instructions for users and contributors.</p>
                            <a href="https://porfanid.github.io/QuestMatch" target="_blank" rel="noreferrer">Documentation</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card contribute-card">
                        <div className="card-body text-center">
                            <i className="fas fa-bug"></i>
                            <h4>Report Bugs</h4>
                            <p>Encounter a bug or issue? Let us know by opening an issue on the GitHub repository so that we
                                can address it and improve the app's functionality.</p>
                            <a href="https://github.com/porfanid/QuestMatch/issues" target="_blank" rel="noreferrer">Report Issues</a>
                        </div>
                    </div>
                </div>
                {/* Add a new card here */}
                <div className="col-md-4 mb-4">
                    <div className="card contribute-card">
                        <div className="card-body text-center">
                            <i className="fab fa-discord"></i> {/* Font Awesome Discord Icon */}
                            <h4>Join Our Community</h4>
                            <p>Join our Discord server community to stay updated, discuss features, and connect with other
                                players interested in D&D campaigns.</p>
                            <a href="https://discord.gg/pwwc3sKJ8x" target="_blank" rel="noreferrer">Discord Server</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Contribute;