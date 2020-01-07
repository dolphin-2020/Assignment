if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register("js/sw.js")
    .then(()=>{
      console.log("Success for navigator");
    })
    .catch(err=>{
      console.log("Failed for navigator:",errs);
    });
  });
};