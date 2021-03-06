import React from 'react'
import ClanComponent from '../components/clan/clanComponent'


// <<<<<<< mobileItems
// const Clan = ({ session }) => {
//   let { singleHouseholdProfiles } = useSelector((store) => store)

//   let [profiles, loading] = [
//     singleHouseholdProfiles.entities,
//     singleHouseholdProfiles.loading,
//   ]
//   let { householdInfo } = useSelector((store) => store.singleHouseholdProfiles)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(fetchAllProfiles(), fetchHouseholdInfo())
//   }, [])

//   const easing = [0.6, -0.05, 0.01, 0.99]
//   const stagger = {
//     animate: {
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   }
//   const fadeInUp = {
//     initial: {
//       y: 50,
//       opacity: 0,
//     },
//     animate: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: easing,
//       },
//     },
//   }

//   return (
//     <motion.div
//       exit={{ opacity: 0 }}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <div
//         className="card hero mx-auto mb-5 overflow-hidden rounded-3xl p-0 drop-shadow-2xl"
//         style={{
//           backgroundImage: `url(https://scontent-ort2-2.xx.fbcdn.net/v/t39.30808-6/244607226_4976383192391443_8852424966271916005_n.png?_nc_cat=108&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=OgqCxFXz9rQAX-k4L_Y&_nc_ht=scontent-ort2-2.xx&oh=00_AT_iqegFFW3LovBxUPocNcsbThneTZwr6dbH7PIawTx-Ow&oe=62897827)`,
//         }}
//       >
//         <div className="hero-overlay bg-opacity-60"></div>
//         <div className="hero-content text-center text-neutral-content">
//           <div className="max-w-md py-10">
//             <h1 className="houseName mb-3 text-8xl font-bold">
//               {`Clan ${householdInfo.name}`}
//             </h1>
//             <p className="mb-5 items-center">
//               Level up and surpass your peers by completing chores and earning
//               XP. Your xp will be used to trade for gold and as we know gold is
//               PRICELESS.
//             </p>
//           </div>
//         </div>
//       </div>

//       <motion.div
//         variants={stagger}
//         className="mb-4 justify-around gap-4 md:grid md:grid-cols-2"
//       >
//         {profiles.map((profile) => (
//           <motion.div
//             variants={fadeInUp}
//             key={profile.id}
//             className="min-w-200 frosted card mb-5 flex-auto basis-full bg-base-100 p-5 shadow-xl"
//           >
//             <div className="mb-5">
//               <figure>
//                 <img
//                   src={profile.avatar_url}
//                   alt="Profile image"
//                   className="justifyCenter mask mask-hexagon mx-auto h-64 w-64 content-center"
//                 />
//               </figure>
//               <div className="card-body">
//                 <h2 className="card-title mx-auto">{profile.username}</h2>
//                 <p className="mx-auto">Peasant!</p>
//                 <div className="card-actions justify-center">
//                   <Link href={`/profiles/${encodeURIComponent(profile.id)}`}>
//                     <motion.button
//                       whileHover={{
//                         scale: 1.1,
//                         transition: { duration: 0.2 },
//                       }}
//                       whileTap={{ scale: 0.9 }}
//                       className="focus:shadow-outline rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-800 focus:outline-none"
//                     >
//                       Profile page
//                     </motion.button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </motion.div>
//   )
const ClanPage = () => {
  return <ClanComponent />
}

export default ClanPage
