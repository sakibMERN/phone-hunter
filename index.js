const loadAllPhones = async (status, brandName) => {
//   console.log(brandName);

  document.getElementById("spinner").style.display = "none";

  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      brandName ? brandName : "iphone"
    }`
  );

  const data = await response.json();
  // console.log(data.data);

  if (status) {
    displayAllPhone(data.data);
  } else {
    displayAllPhone(data.data.slice(0, 6));
  }
};

// {
//     "brand": "Apple ",
//     "phone_name": "iPhone 13 mini",
//     "slug": "apple_iphone_13_mini-11104",
//     "image": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg"
// }

const displayAllPhone = (phones) => {
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.innerHTML = "";

  phones.forEach((phone) => {
    const {image, phone_name, slug, brand } = phone;
    const div = document.createElement("div");
    const item = phone_name;

    div.innerHTML = `
            <div class="card bg-base-100 w-96 shadow-xl m-2">
                <figure class="px-10 pt-10">
                    <img
                     src="${image}"
                     alt="Shoes"
                     class="rounded-xl" 
                    />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${item}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions">
                        <button id="${slug}" onclick = "phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
                    </div>
                </div>
            </div>
        `;
        phoneContainer.appendChild(div);
  });
};

const handleShowAll = () => {
  // console.log("all phones");
  loadAllPhones(true);
};

const handleSearch = (event) => {
  // console.log("hello");
  document.getElementById("spinner").style.display = "block";

  const searchText = document.getElementById("search-box").value;

  setTimeout(() => {
    loadAllPhones(false, searchText);
  }, 3000);
};

const phoneDetails = async (slugs) => {
    console.log(slugs);
    const uri = `https://openapi.programming-hero.com/api/phone/${slugs}`;

    const response = await fetch(uri);
    const data = await response.json();
    console.log(data.data);

    const {brand, image, slug} = data.data;

    const modalContainer = document.getElementById("modal-container");

    modalContainer.innerHTML = `
        <dialog id="my_modal_1" class="modal">
            <div class="modal-box">
                <h3 class="text-lg font-bold">${brand}</h3>
                <p class="py-4">Press ESC key or click the button below to close</p>
                <img class = "mx-auto" src = "${image}"/>
                <div class="modal-action">
                    <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    `

    my_modal_1.showModal();
}

//for data load when data reload.
loadAllPhones();
