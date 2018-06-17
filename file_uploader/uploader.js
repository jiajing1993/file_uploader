(function() {
  console.log("jiajign")
  function SVGUploader({input, target_input_id}) {

    this.input = input;
    this.file = input.files[0];
    this.reader = new FileReader;

    this.options = {
      // fileType : "image/svg+xml",
      fileType : "image/png",
    }

    this.settings = {
      successMessage: "Nice, SVG looks good!",
      errorMessage: "Error, only SVG is accepted"
    }

    this.element = {
      // icon_input:   $(target_input_id),
      icon_preview: document.getElementsByClassName("icon-svg-preview")[0],
      alert_dialog: document.getElementsByClassName("alert_dialog")[0],
    }

    this.uploadSVG = function() {
      this.resetUploader();
      this.reader.readAsText(this.file);
      this.reader.onload = handleReaderLoad.bind(this)
    }

    handleReaderLoad = function(event) {
      // this.element.icon_input.val(event.target.result);
      this.element.alert_dialog.innerHTML = "<div class='alert alert-success'> "+ this.settings.successMessage + "</div>";
      console.log(this.element.icon_preview)
      this.element.icon_preview.innerHTML = event.target.result;
    }

    this.showError = function() {
      this.reader.abort();
      this.resetUploader();
      this.element.alert_dialog.innerHTML = "<div class='alert alert-danger'> "+ this.settings.errorMessage +"</div>";
      // this.element.alert_dialog.append("<div class='alert alert-danger'> "+ this.settings.errorMessage +"</div>");
    }

    this.resetUploader = function() {
      // this.element.icon_input.val("");
      // this.element.icon_preview.empty();
      // this.element.alert_dialog.empty();
    }
  }

  SVGUploader.prototype.validateFile = function(){
    console.log(this.file.type)

    if (this.file.type === this.options.fileType){
      this.uploadSVG()
    }else {
      this.showError()
    }
  }

  window.SVGUploader = SVGUploader
})()