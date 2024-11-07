import styles from "./sign-up-card.module.css";

function SignUpCard({title, icon, perks}){

    return (

        <section className={styles.signUp}>

            <div className={styles.cardHead}>
                <h2 className={styles.cardTitle}>{title}</h2>
            </div>

            <div className={styles.cardIconContainer}>
                <img src={icon} alt="Card Icon" className={styles.cardIcon} />
            </div>

            <div className={styles.perksContainer}>
                <div className={styles.perks}>
                    {perks.map(perk => {
                        return (
                            <p className={styles.perkItem}>{perk}</p>
                        )
                    })}
                </div>

                <button className={styles.signUpButton}>Sign Up</button>

            </div>

        </section>

    )

}

export default SignUpCard;