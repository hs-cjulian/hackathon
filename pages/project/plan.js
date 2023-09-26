import React, { useState } from 'react'
import css from '@/styles/plan.module.scss'
import Modal from "@/components/Modal";

function getRandomArbitrary(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

export async function getServerSideProps({ req, res, query }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=600'
  )
  try {
    const postalCode = query['postalCode'].replace(/\s/g, '').toUpperCase();
    const url = `http://127.0.0.1:3000/recommendations?postal_code=${postalCode}`
    console.log(url)

    const response = await fetch(url, { cache: 'force-cache' })
    const json = await response.json()
    const tasks = json.tasks.filter(t => t.name).map(t => {
      return {
        ...t,
        // price: getRandomArbitrary(340, 998)
        price: t.price.replace('$','')
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

export default function Plan({ recommendations }) {
  const [ showModal, setShowModal ] = useState(false)
  const [ modalTaskIndex, setModalTaskIndex ] = useState(0)
  const [ selectedTasks, setSelectedTasks ] = useState([])
  const [ numToShow, setNumToShow ] = useState(3)

  const openModal = (index) => {
    setModalTaskIndex(index)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const selectTask = (index) => {
    setSelectedTasks(prev => {
      return [...prev, index]
    })
  }

  const removeTask = (index) => {
    setSelectedTasks(prev => {
      return prev.filter(i => i !== index)
    })
  }

  const modalRec = recommendations[modalTaskIndex]

  return (
    <div className={css.root}>
      <div className={css.header}>
        <a href={"http://localhost:3000"}><img src={'/logo.svg'} /></a>
        <ul className={css.nav}>
          <li className={css.navItem}>Browse Categories</li>
          <li className={css.navItem}>Write a Review</li>
          <li className={css.navItem} style={{fontWeight: 600}}>Project Planner</li>
        </ul>
      </div>
      <div className={css.content}>
        <section className={css.sidebar}>
          <div className={css.welcome}>
            Hi, 👋 Welcome to your
            personalized planner <span className={css.exclamation}>!</span>
          </div>
          <div className={css.sidenav}>
            <ul className={css.sidenavItems}>
              <li>Home Profile</li>
              <li style={{ color: '#32527C', fontWeight: 700 }}>Project Planner</li>
              <li>Service Requests</li>
              <li>Saved</li>
              <li>Account Settings</li>
            </ul>
          </div>
        </section>
        <main className={css.main}>
          <div className={css.recommendations}>
            {
              recommendations.slice(0, numToShow).map((rec, i) => {
                return (
                  <button
                    className={css.recommendation}
                    key={i}
                    onClick={openModal.bind(null, i)}
                  >
                    <img src={`http://localhost:3000/assets/categories/${rec.category_id}.jpg`} />
                    <div className={css.taskNameBenefit}>
                      <h2 className={css.taskName}>{rec.name}</h2>
                      <p className={css.benefit}>
                        <img className={css.sparkles} src='/sparkles.svg'/> Prevents costly damage
                      </p>
                    </div>
                    <div className={css.avgCost}>
                      $ {rec.price} / <span>average cost</span>
                    </div>

                    {
                      selectedTasks.includes(i) ? null : (
                        <a
                          className={css.button}
                          onClick={(event) => {
                          event.stopPropagation();
                          selectTask(i)
                        }}>
                          Select
                        </a>
                      )
                    }
                    {
                      !selectedTasks.includes(i) ? null : (
                        <a
                          className={css.button}
                          onClick={(event) => {
                          event.stopPropagation();
                          removeTask(i)
                        }}>
                          Remove
                        </a>
                      )
                    }
                  </button>

                )
              })
            }
            <div
              className={css.more}
              onClick={() => { setNumToShow(prev => prev + 1) }}
            >
              <img className={css.moreIcon} src='/plus.svg'/>
            </div>
          </div>
        </main>
        {
          selectedTasks.length === 0 ? null : (
            <section className={css.selectedWrapper}>
              <h3 className={css.projectPlan}>
                <img className={css.sparkles} src='/clipboard.svg'/> Project Plan
              </h3>
              <div className={css.line}/>
              <ol>
              {
                selectedTasks.map((index) => {
                  return (
                    <li key={index}>
                      &nbsp;{ recommendations[index].name }
                    </li>
                  )
                })
              }
              </ol>
              <div className={css.selectedButtons}>
                <button className={css.button}>Share</button>
                <button className={css.proButton}>Find Pros</button>
              </div>
            </section>
          )
        }
      </div>
      {
        !showModal ? null : (
          <Modal closeModal={closeModal}>
            <div className={css.modalWrapper}>
              <div className={css.modalTop}>
                <img className={css.modalImg} src={`http://localhost:3000/assets/categories/${modalRec.category_id}.jpg`} />
                <div className={css.modalDetails}>
                  <h3>{modalRec.name}</h3>
                  <span className={css.completed}>324 homeowners completed in your area </span>
                  <div className={css.modalAvgCost}>
                    $ {modalRec.price} / <span>average cost</span>
                  </div>
                  <div className={css.line}/>
                  <div className={css.modalBenefits}>
                    <h4 className={css.benefitsHeading}>
                      <img className={css.sparkles} src='/dark-sparkles.svg'/> Value and benefits
                    </h4>
                    <ul className={css.benefitsList}>
                      <li>Prolonged roof lifespan</li>
                      <li>Early problem detection</li>
                      <li>Energy efficiency</li>
                      <li>Property value</li>
                      <li>Prevents interior damage</li>
                      <li>Mold and mildew prevention</li>
                      <li>Safety</li>
                    </ul>
                  </div>

                </div>
              </div>

              <div className={css.modalPros}>
                <h4>Pros who can help you complete this project</h4>
                <div className={css.modalProsList}>
                  <div className={css.modalPro}>
                    <div className={css.proPlaceholder} />
                  </div>
                  <div className={css.modalPro}>
                    <div className={css.proPlaceholder} />
                  </div>
                  <div className={css.modalPro}>
                    <div className={css.proPlaceholder} />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )
      }
    </div>
  )
}
