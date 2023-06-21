import React from 'react'

function Split() {
  return (
 <>
<div class="split left">
  <div class="centered">
  <div class='split-pane col-xs-12 col-sm-6 '>
  <div>
    <div class='text-content'>
      <div class="bold">Visit to</div>
      <div class='big'>ADMIN SIDE</div>
    </div>
    <a href='/admin/login' class='button'>
     Take me To Admin Side
    </a>
  </div>
</div>
   
  </div>
</div>

<div class="split right">
  <div class="centered">
  <div class='split-pane col-xs-12 col-sm-6 '>
  <div>
    <div class='text-content'>
      <div class="bold">Visit to</div>
      <div class='big'>USER SIDE</div>
    </div>
    <a href='/app/signin' class='button'>
     Take me To User Side
    </a>
  </div>
</div>
  </div>
</div>
 </>
  );
}
export default Split;