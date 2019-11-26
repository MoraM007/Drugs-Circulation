/**
 * Create Pharma Transaction
 * @param {org.dcpl.drugscirc.phrms.CreatePharma} PharmaData
 * @transaction
 */
function    CreatePharma(PharmaData) {
    // 1. Get the asset registry
    return getAssetRegistry('org.dcpl.drugscirc.phrms.Pharma')
        .then(function(pharmaRegistry){
            // Now add the Pharma

            // 2. Get resource factory
            var  factory = getFactory();
            var  NS =  'org.dcpl.drugscirc.phrms';

            // 3. Create the Resource instance
            
            var  PharmaID = generatePharmaID(PharmaData.Name,PharmaData.Schedule);
            var  pharma = factory.newResource(NS,'Pharma',PharmaID);
            pharma.Name = PharmaData.Name;
            pharma.Name = [];

            // 4. Set the relationship
            pharma.Name = PharmaData.Name;

            // 5. Create a new concept using the factory & set the data in it
            var route = factory.newConcept(NS,"Route");

            route.destination = PharmaData.Destination;
            route.schedule = PharmaData.Schedule;
            route.branch = PharmaData.Branch;
            pharma.route = route;
            

            // 6. Emit the event PharmaCreated
            var event = factory.newEvent(NS, 'PharmaCreated');
            event.PharmaID = PharmaID;
            emit(event);

            return pharmaRegistry.addAll([pharma]);
        });
}

function generatePharmaID(Name, Schedule){
    var dt = new Date(Schedule)

    // Date & Month needs to be in the format 01 02 
    // so add a '0' if they are single digits
    var month = dt.getMonth()+1;
    if((month+'').length == 1)  month = '0'+month;
    var dayNum = dt.getDate();
    if((dayNum+'').length == 1)  dayNum = '0'+dayNum;

    // console.log(dayNum,month,dt.getFullYear())

    return Name+'-'+month+'-'+dayNum+'-'+(dt.getFullYear()+'').substring(2,4);
}



/****
 
 */