function getRandomArbitrary(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

import styles from '@/styles/plan.module.scss'
export async function getServerSideProps() {
  try {
    const response = await fetch('http://127.0.0.1:3000/recommendations?postal_code=K7C0A6')
    const json = await response.json()
    const tasks = json.tasks.filter(t => t.name).map(t => {
      return {
        ...t,
        price: getRandomArbitrary(100, 400)
      }
    })
    return {
      props: {
        recommendations: tasks,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default function Plan({ recommendations, numToShow = 3 }) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <img src={'/logo.svg'} />
        <ul className={styles.nav}>
          <li className={styles.navItem}>Browse Categories</li>
          <li className={styles.navItem}>Write a Review</li>
          <li className={styles.navItem} style={{fontWeight: 600}}>Project Planner</li>
        </ul>
      </div>
      <div className={styles.content}>
        <section className={styles.sidebar}>
          <div className={styles.welcome}>
            Hi, 👋 Welcome to your
            personalized planner <span className={styles.exclamation}>!</span>
          </div>
          <div className={styles.sidenav}>
            <ul className={styles.sidenavItems}>
              <li>Home Profile</li>
              <li style={{ color: '#32527C', fontWeight: 700 }}>Project Planner</li>
              <li>Service Requests</li>
              <li>Saved</li>
              <li>Account Settings</li>
            </ul>
          </div>
        </section>
        <main className={styles.main}>
          <div className={styles.recommendations}>
            {
              recommendations.slice(0, numToShow).map((rec, i) => {
                return (
                  <button
                    className={styles.recommendation}
                    key={i}
                    onClick={() => alert(`pretend this is a modal for ${rec.name}`)}
                  >
                    <img src={`http://localhost:3000/assets/categories/${rec.category_id}.jpg`} />
                    <div className={styles.taskNameBenefit}>
                      <h2 className={styles.taskName}>{rec.name}</h2>
                      <p className={styles.benefit}>
                        <img className={styles.sparkles} src='/sparkles.svg' />Prevents costly damage
                      </p>
                    </div>
                    <div className={styles.avgCost}>
                      ${rec.price} / <span>average cost</span>
                    </div>
                  </button>

                )
              })
            }
          </div>
        </main>
      </div>
    </div>
  )
}
