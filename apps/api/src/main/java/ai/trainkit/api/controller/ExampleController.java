package ai.trainkit.api.controller;

import ai.trainkit.api.model.Example;
import ai.trainkit.api.service.ExampleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/examples")
public class ExampleController {

    private final ExampleService exampleService;

    public ExampleController(ExampleService exampleService) {
        this.exampleService = exampleService;
    }

    @PostMapping("/{datasetId}")
    public ResponseEntity<Example> createExample(@PathVariable Long datasetId, @RequestBody Example example) {
        return ResponseEntity.ok(exampleService.createExample(datasetId, example));
    }

    @GetMapping
    public ResponseEntity<List<Example>> getAllExamples() {
        return ResponseEntity.ok(exampleService.getAllExamples());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Example> getExampleById(@PathVariable Long id) {
        return exampleService.getExampleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/dataset/{datasetId}")
    public ResponseEntity<List<Example>> getExamplesByDataset(@PathVariable Long datasetId) {
        List<Example> examples = exampleService.getExamplesByDatasetId(datasetId);
        return ResponseEntity.ok(examples);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Example> updateExample(@PathVariable Long id, @RequestBody Example updatedExample) {
        return ResponseEntity.ok(exampleService.updateExample(id, updatedExample));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExample(@PathVariable Long id) {
        exampleService.deleteExample(id);
        return ResponseEntity.noContent().build();
    }
}
