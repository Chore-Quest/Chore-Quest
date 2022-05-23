import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSingleUserItem } from '../../store/features/singleUserItem'
import ButtonWrapper from './payPalButtonWrapper'

export default function SingleUserItem({ userItemId }) {
  const dispatch = useDispatch()
  const { data: item, loading } = useSelector((store) => store.singleUserItem)
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    dispatch(fetchSingleUserItem(userItemId))
  }, [userItemId])

  // Display the spinner if loading
  if (loading)
    return (
      <div className="flex items-center justify-center">
        <div
          className="
    mt-36
    h-32
    w-32
    animate-spin
    rounded-full border-t-2 border-b-8 border-blue-900
  "
        ></div>
      </div>
    )

  return (
    <>
      {item && item.id ? (
        <>
          <div className="flex flex-col items-center">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src={item.items.imageURL} alt={item.items.name} />
              </figure>
              <div className="card-body">
                <div className="badge badge-info">
                  Trades for: ${item.xp / 1000}
                </div>
                <h2 className="card-title">{item.items.name}</h2>
                <p>{item.items.description}</p>
                <div className="card-actions justify-center">
                  <button
                    htmlFor="paypal-modal"
                    className="modal-button btn btn-primary"
                    onClick={() => setShowModal(true)}
                  >
                    Trade Now
                  </button>
                </div>
              </div>
            </div>
            <></>
          </div>
        </>
      ) : (
        <h1>Item not found</h1>
      )}
      {item && item.id ? (
        <>
          <input type="checkbox" id="paypal-modal" className="modal-toggle" />
          <div className={showModal ? 'modal modal-open' : 'modal'}>
            <div className="modal-box relative">
              <label
                htmlFor="paypal-modal"
                class="btn btn-circle btn-md absolute right-2 top-2 z-40 text-2xl"
                onClick={(e) => {
                  e.preventDefault()
                  setShowModal(false)
                }}
              >
                ✕
              </label>
              <div className="card bg-base-100 shadow-xl lg:card-side">
                <figure>
                  <img src={item.items.imageURL} alt={item.items.name} />{' '}
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-center">
                    Trade-in {item.items.name} for ${item.xp / 1000}
                  </h2>
                  <p></p>
                  <ButtonWrapper />
                  <button
                    className="btn btn-outline btn-accent btn-sm"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowModal(false)
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
