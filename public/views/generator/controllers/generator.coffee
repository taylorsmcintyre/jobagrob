jobagrob.controller('Generator', ($scope) ->
  $scope.fieldsets = []
  $scope.addFieldset = ->
    $scope.fieldsets.push elems: []

  $scope.addElem = (templ, fieldset) ->
    fieldset.elems.push template: templ

  $scope.removeElem = (elems, elem) ->
    elems.splice elems.indexOf(elem), 1

  $scope.addOption = (elem) ->
    #select new object were pushing to options
    elem.opts.push elem.$$selectedOption = {}

  $scope.removeOption = (opts, optn) ->
    opts.splice opts.indexOf(optn), 1

  $scope.addRadio = (elem) ->
    #select new object were pushing to options
    elem.radios.push {}

  $scope.removeRadio = (radios, radio) ->
    radios.splice radios.indexOf(radio), 1

  $scope.addCheckbox = (elem) ->
    #select new object were pushing to options
    elem.checkboxes.push {}

  $scope.removeCheckbox = (checkboxes, checkbox) ->
    checkboxes.splice checkboxes.indexOf(checkbox), 1

  $scope.serialize = (f) ->
    alert angular.toJson(f)
)