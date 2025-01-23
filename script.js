let notice = document.querySelector('header')
let notice2 = document.querySelector('.notice')
document.addEventListener('click', () => {
	alert("THis is a Demo Version")
})
console.log(window.innerWidth)
if (window.innerWidth < 1000) {
	notice2.style.display = "flex"
	notice.style.display = "none"
}