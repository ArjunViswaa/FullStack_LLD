import CoreConcept from "./CoreConcept";
import { CORE_CONCEPTS } from "../data";

const CoreConcepts = () => {
    return (
        <section id="core-concepts">
            <h2>Time to get started!</h2>
            <ul>
                {/* <CoreConcept title={CORE_CONCEPTS[0].title} description={CORE_CONCEPTS[0].description} image={CORE_CONCEPTS[0].image} />
            <CoreConcept {...CORE_CONCEPTS[1]} />
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} /> */}
                {
                    // CORE_CONCEPTS.map((concept) => {
                    //   return <CoreConcept {...concept} />
                    // }) // This is one of the return works of Arrow function
                    CORE_CONCEPTS.map((concept) => (
                        <CoreConcept key={concept.title} {...concept} />
                    ))
                }
            </ul>
        </section>
    );
}

export default CoreConcepts;