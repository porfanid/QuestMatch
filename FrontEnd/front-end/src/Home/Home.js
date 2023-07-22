import "../App.css";
import image from "./dnd-quests.webp";
import banner from "./QuestMatch.png";

function Home() {
    return (
        <>
            <div className="jumbotron">
                <img src={banner} alt="QuestMatch Banner" className="img-fluid"/>
                    <h1 className="display-4">QuestMatch</h1>
                    <p className="lead">
                        QuestMatch is a platform designed to connect people who share an interest in
                        playing Dungeons
                        & Dragons (D&amp;D) together. Whether you're an experienced Dungeon Master or a complete
                        beginner, QuestMatch
                        allows you to find like-minded individuals and form groups to embark on epic adventures in the
                        world of D&amp;D.
                        Meet new friends, share experiences, and immerse yourself in the magical realms of role-playing
                        games.
                    </p>
            </div>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><i className="fa fa-users"></i> Meet New People</h5>
                            <p className="card-text">QuestMatch connects you with a community of D&amp;D enthusiasts
                                from all around the world.
                                Discover like-minded players and Dungeon Masters to embark on epic quests together.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><i className="fa fa-comments"></i> Real-Time Communication</h5>
                            <p className="card-text">Stay connected with your party members through real-time chat and
                                voice messaging. Coordinate
                                strategies, share insights, and immerse yourself in the immersive world of D&amp;D like
                                never before.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><i className="fa fa-dice"></i> Epic Campaigns</h5>
                            <p className="card-text">Embark on thrilling quests, explore fantastical realms, and battle
                                mythical creatures in epic
                                campaigns crafted by experienced Dungeon Masters. Unleash your inner hero and leave a
                                mark in the world of D&amp;D.</p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h2 className="font-weight-bold mb-4">Embark on Epic Quests</h2>
                            <p className="lead">Are you ready for thrilling adventures and exciting quests? With
                                QuestMatch, you can create campaigns and explore
                                fantastical worlds, brave treacherous dungeons, and unravel mysteries in the realm of
                                D&amp;D. Assemble
                                your party and conquer the most challenging campaigns, earning rewards and recognition
                                for your heroic deeds.</p>
                            <p className="lead">Whether you seek ancient artifacts, battle mythical creatures, or solve
                                ancient riddles, QuestMatch
                                provides the platform to connect and experience epic quests that will immerse you in a
                                world of magic and wonder.</p>
                        </div>
                        <div className="col-md-6">
                            <img src={image} alt="Embark on Epic Quests" className="img-fluid rounded"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;