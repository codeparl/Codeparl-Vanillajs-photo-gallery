// PhotoGallery.js - version 1.0 1
//
// Copyright (c) 2020. CodeParl for code examples.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//   * Neither the name of CodeParl nor the names of its
//     contributors may be used to endorse or promote products derived from this
//     software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.


//-------------------------------+
//-- AUTHOR: HASSAN MUGABO ------+
//-- EMIAL: cybarox@gmail.com ---+
//-------------------------------+

(function(){

    if(typeof photoGallery == 'undefined')
      window.PhotoGallery = {};
     
      PhotoGallery.imageNames = [
        'computer-desk-hand',
        'Customer-care',
        'employee',
        'house',
        'laptop',
        'mountain',
        'penguin-birds',
        'students',
        'tablet',
        'training-room',
        'working-team'
    ];

    
//prepare and initialize image thumbnails list
PhotoGallery.makeThumbNails =  function(){

    PhotoGallery.base=window.location.protocol+'//'+window.location.host+'/gallery/'
    PhotoGallery.imagePath  =  'assets/images/';
    PhotoGallery.thumbnailsSection  =  document.getElementById('thumbnails');

//begin by creating a thumbnails wrapper element
    let div =  document.createElement('div');
    div.className = 'thumbnailList';

    //create thumbnails equal to the number of image names 
    for (let i = 0; i < this.imageNames.length; i++) {
        const name = this.imageNames[i];
        
        //create an (img) tag and set neccessary attributes
        let img  = document.createElement('img');
        img.src = PhotoGallery.imagePath+name+'.jpg';
        img.width = 150;

        //create (a) tag which will wrap the image
        let a =  document.createElement('a');
        a.appendChild(img);
        a.href ='#';
        a.setAttribute('data-img',name+'.jpg');

        //is this the first  thumbnail
        if(i === 0){ 
            //highlight the first thumbnail
            a.classList.add('active-thumbnail');
            PhotoGallery.addOverlayText(a);     
        }
        //put the (a) tag on the list 
        div.appendChild(a);  
    }//end loop
 
    //the (this) refers to PhotoGallery object
    this.thumbnailsSection.appendChild(div);
    //Now the thumbnails are ready and we should initiaize the thumbnails property
    PhotoGallery.thumbnails = document.querySelectorAll('.thumbnailList a');

};

//This method adds a (p) element on top of the hovered (a) element
//of the thumbnail
PhotoGallery.addOverlayText =  function (element){
    var p =  document.createElement('p');
    p.textContent =  PhotoGallery.extractImageName(element);
    element.appendChild(p);
}


//This method extracts the image name from the 
//img data attribute of the thumbnail (a) tag
PhotoGallery.extractImageName =   function (element){
    let imageName  =  element.dataset.img;
    imageName = imageName.slice(0, imageName.lastIndexOf('.'));
return imageName.replace('-', ' '); //remove all hyphens
}

//This method removes the (p) element when the mouse leaves the 
//thumbnail (a) tag
PhotoGallery.removeElement=  function (parent){
    let p  =  PhotoGallery.findElement(parent,'P');
    if(p !== null)
    parent.removeChild(p);

};


//This method takes a parent element and a string for the name 
//of the child element to find and if the child exists, then 
//it will return the child node of the parent element that matches the node name.  
PhotoGallery.findElement=function (parent,child){
    var nodes = parent.childNodes;
    let element  = null;
    nodes.forEach(node => {
    if(node.nodeName === child){
        element = node;  
     return;
    }
    });
    return  element;
    };


//Checks whether a given element has a given class
//passed in the parameter className
PhotoGallery.hasClass  = function (element,className){
        return element.classList.contains(className);
    };

//Show the clicked thumbnail image in the image preview 
PhotoGallery.onClickThumbnail = function(){
    //the (this) refers to PhotoGallery
    this.thumbnails.forEach(a => {
        a.onclick = function(){
            PhotoGallery.resetAll();

             //the (this) refers to the clicked (a) tag.
             //Show thumbnail image given that this (a) is 
             //not the active thumbnail.
           if(!PhotoGallery.hasClass(this,'active-thumbnail')){
             let src  =  PhotoGallery.imagePath+this.dataset.img;
             let oldImage = document.getElementById('imagePreview');

             //create a new image and set the neccessary attributs
             let newImage  =  document.createElement('img');
             newImage.id = 'imagePreview';
             newImage.setAttribute('width',"100%");
             newImage.src = src;
             newImage.className = 'slideInDown';

             //remove the old image and replace with this new image   
             document.getElementById('preview').replaceChild(newImage,oldImage);

             //remember to add a click event on this new image
             PhotoGallery.zoomInImage(newImage);
             this.classList.add('active-thumbnail'); //Now this cliked (a) tag is the active
             PhotoGallery.addOverlayText(this); //add the (p) element as an overlay text

           }//end if 
         };//end click
    });

};


//Removes the active state and all (p) elements
PhotoGallery.resetAll =  function (){    
    PhotoGallery.thumbnails.forEach(other => {
        other.classList.remove('active-thumbnail');
        PhotoGallery.removeElement(other);
    });
   
};

//show an overlay text when a thumbnail 
//is hovered
PhotoGallery.onHoverThumbnail =  function(){
    //the (this) refers to PhotoGallery
    this.thumbnails.forEach(a => {
        a.onmouseenter =  function(){
             //the (this) refers to the hovered (a) tag.
            if(!PhotoGallery.hasClass(this,'active-thumbnail')){
                PhotoGallery.addOverlayText(this);
            }
          
          return;  
        }
    
        a.onmouseleave =  function(){
            if(!PhotoGallery.hasClass(this,'active-thumbnail')){
                PhotoGallery.removeElement(this);
            }
            return;
        };
    
    });//end forEach
    
    };


    //Show the full image 
    PhotoGallery.zoomInImage=function (image){

                let clone  =  image.cloneNode(false);
                clone.classList.remove('slideInDown');
                image.onclick = function(){
                    let zoomer  =  document.createElement('div');
                    zoomer.id= 'zoomer';
                    zoomer.className = 'zoomIn';
                    let button  =  document.createElement('button');
                   
                    button.onclick = function(){
                        zoomer.classList.add('zoomOut');

                        //This will allows us to observe the animation effect
                        setTimeout(function(){
                          document.body.removeChild(zoomer);
                        }, 320);

                    };
            
                    let zoomerContainer  =  document.createElement('div');
                    button.innerHTML = "&times;";
                    zoomerContainer.appendChild(button);
                    zoomerContainer.appendChild(clone);
                    zoomer.appendChild(zoomerContainer);
                    document.body.insertBefore(zoomer, document.querySelector('main'));
                };
            };

//This method should be called at the bottom 
//before the closing body tag to initialize the 
//PhotoGalerry object
PhotoGallery.create = function(){
    PhotoGallery.makeThumbNails();
    PhotoGallery.onClickThumbnail();
    PhotoGallery.onHoverThumbnail();
    PhotoGallery.zoomInImage(document.querySelector('#preview img'));

}
            
})();
























