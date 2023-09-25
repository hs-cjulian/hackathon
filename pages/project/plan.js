import styles from '@/styles/plan.module.scss'
export async function getServerSideProps() {
  try {
    const response = await fetch('http://127.0.0.1:3000/recommendations?postal_code=l1n9p8')
    const json = await response.json()
    return {
      props: {
        recommendations: json.tasks.filter(t => t.name),
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default function Plan({ recommendations }) {
  return (
    <div className={styles.root}>
      <h1>Plan</h1>
      <div className={styles.recommendations}>
        {JSON.stringify(recommendations, null, 2)}
        {
          recommendations.map((recommendation, i) => {
            return (
              <div className={styles.recommendation} key={i}>
                <h2>{recommendation.name}</h2>
              </div>
            )
          })
        }

        {/*{*/}
        {/*  recommendations.map((recommendation, i) => {*/}
        {/*    return (*/}
        {/*      <div className={styles.recommendation} key={i}>*/}
        {/*        <h2>{recommendation.name}</h2>*/}
        {/*      </div>*/}
        {/*    )*/}
        {/*  }*/}
        {/*}*/}

      </div>
    </div>
  )
}
