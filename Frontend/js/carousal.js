const reviews=[
    {
        name:"Xorazm92",
        reviews:"Salom, men Xorazm92man! Men hozirgina yangi ryukzak sumkamni oldim va u aynan men qidirayotgan narsa edi!!!! Men uni juda yaxshi ko'raman!!!! Men sizning mahsulotlaringizni yaxshi ko'raman!!!!! Katta rahmat va NBT ga rahmat."
    },
    {
        name:"Maryam",
        reviews:"Men NBT do'konidan juda mamnunman. Mahsulotlar sifati a'lo darajada, xizmat ko'rsatish ham juda yaxshi. Albatta yana xarid qilaman!"
    },
    {
        name:"Aziz",
        reviews:"NBT mahsulotlari boshqa brendlardan ancha sifatli. Narx-sifat nisbati juda yaxshi. Do'stlarimga ham tavsiya qilaman."
    }
];
const Name=document.querySelector(".test_box h4");
const Review=document.querySelector(".test_box p");
const btn=document.getElementsByClassName("next-circle");

let i=0;
setInterval(myTimer, 2000);
const reviewName=document.querySelector(".test_box");
function myTimer() {
    Name.textContent=reviews[i%3].name;
    Review.textContent=reviews[i%3].reviews;
    btn[i%3].style.backgroundColor="black";
    btn[(i+1)%3].style.backgroundColor="#ff8aa5";
    btn[(i+2)%3].style.backgroundColor="#ff8aa5";


    i++;

}
