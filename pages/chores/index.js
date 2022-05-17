import AllClanChores from '../../components/allChores'

export default function ChoresIndex() {
  return (
    <>
      <div
        className="card hero mx-auto mb-5 overflow-hidden rounded-3xl p-0 drop-shadow-2xl"
        style={{
          backgroundImage: `url(https://img.nerdburglars.net/wp-content/uploads/2020/04/spartan-3696073_1920-e1585934263741-696x381.jpg)`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-3 text-5xl font-bold">Chores</h1>
            <p className="mb-5">
              Here is the list of items you need to complete in order to LEVEL
              UP!
            </p>
          </div>
        </div>
      </div>
      <AllClanChores />
    </>
  )
}
