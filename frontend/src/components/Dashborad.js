import React from "react";

const Dashborad = () => {
  return (
    <>
      <div className="carousel carousel-center rounded-box">
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
            alt="Pizza"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
            alt="Pizza"
          />
        </div>
      </div>
    </>
  );
};

export default Dashborad;

// const three = data.slice(0,3)
//   return (
//     <div>
//       <div className="carousel carousel-end rounded-box h-screen border-spacing-5">
//         {three.map((product, index) => (
//           <div key={index} className="carousel-item border-spacing-48">
//             <img className="border-spacing-24" src={product.image} alt="Drink" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
