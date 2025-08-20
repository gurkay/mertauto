package com.template.backend.controllers;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.template.backend.entities.Kasa;
import com.template.backend.interfaces.IKasaService;

@Controller
@RequestMapping("/api/kasalar")
public class KasaController {
    private final IKasaService<Kasa> kasaService;

    public KasaController(IKasaService<Kasa> kasaService) {
        this.kasaService = kasaService;
    }
    
    @GetMapping("/page/{pageNum}")
    public ResponseEntity<Page<Kasa>> findAllPagination(
        @PathVariable(value = "pageNum") int pageNum,
        @RequestParam("sortField") String sortField,
        @RequestParam("sortDir") String sortDir,
        @RequestParam("keyword") String keyword) {
            
        if (sortField == null) {
            sortField = "kasaIslemTuru.adi";
            sortDir = "asc";
        }
        Page<Kasa> pageKasa = kasaService.findAllPagination(pageNum, sortField, sortDir, keyword);
        return ResponseEntity.ok(pageKasa);
    }

    @PostMapping
    public ResponseEntity<Kasa> save(@RequestBody Kasa kasa) {
        Kasa savedKasa = kasaService.save(kasa);
        return ResponseEntity.ok(savedKasa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kasa> update(@PathVariable Long id, @RequestBody Kasa kasa) {
        Kasa updatedKasa = kasaService.update(id, kasa);
        return ResponseEntity.ok(updatedKasa);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        kasaService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kasa> findById(@PathVariable Long id) {
        Kasa kasa = kasaService.findById(id);
        return ResponseEntity.ok(kasa);
    }
}
