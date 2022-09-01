import useCreatePropertyMutation from "hooks/queries/properties/propertiesCreateMutation";

const PropertiesCreate = () => {
  const { mutate: createProperty, isLoading: creating } = useCreatePropertyMutation();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const facilities = [
      {
        "name": "Free Wi-Fi",
        "icon_name": "WifiIcon",
        "important": false
      },
      {
        "name": "Shower",
        "icon_name": "ShowerIcon",
        "important": true
      },
      {
        "name": "Free Parking In The Area",
        "icon_name": "GarageIcon",
        "important": true
      }
    ];

    const features = [
      {
        "name": "Balcony",
        "icon_name": "BalconyIcon",
        "important": false,
        "value": 1
      },
      {
        "name": "Bathroom",
        "icon_name": "BathroomIcon",
        "important": true,
        "value": 1
      },
      {
        "name": "Livingroom",
        "icon_name": "LivingIcon",
        "important": true,
        "value": 2
      }
    ];

    const formData = new FormData();
    formData.append("property[title", "Property title 1");
    formData.append("property[description]", "Nostrud aute enim id ex magna cupidatat aliquip in. Nulla nisi excepteur consectetur eu est. Non laborum excepteur ex ipsum. Labore occaecat reprehenderit minim aute Lorem.");
    formData.append("property[p_type]", "house");
    formData.append("property[p_status]", "rent");
    formData.append("property[features]", JSON.stringify(features));
    formData.append("property[facilities]", JSON.stringify(facilities));
    formData.append("property[address]", "22840 Walker Plains, Wiltonberg, ME 81787-9729");

    const medias_length = document.getElementById('medias').files.length;

    for (let x = 0; x < medias_length; x++) {
      formData.append("property[medias][]", document.getElementById('medias').files[x]);
    }

    createProperty(formData, {
      onError: () => {
        console.log("Error!");
      }
    })
  }

  return (
    <form>
      <input type="file" id="medias" name="medias" multiple></input>
      <button type="button" onClick={onSubmitHandler}>Submit</button>
    </form>
  )
}

export default PropertiesCreate;