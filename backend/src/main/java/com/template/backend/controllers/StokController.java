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

import com.template.backend.entities.Stok;
import com.template.backend.interfaces.IStokService;

@Controller
@RequestMapping("/api/stoklar")
public class StokController {

    private final IStokService<Stok> stokService;

    public StokController(IStokService<Stok> stokService) {
        this.stokService = stokService;
    }
    
    @GetMapping("/page/{pageNum}")
    public ResponseEntity<Page<Stok>> findAllPagination(
        @PathVariable(value = "pageNum") int pageNum,
        @RequestParam("sortField") String sortField,
        @RequestParam("sortDir") String sortDir,
        @RequestParam("keyword") String keyword) {
            
        if (sortField == null) {
            sortField = "stokAdi";
            sortDir = "asc";
        }
        Page<Stok> pageStok = stokService.findAllPagination(pageNum, sortField, sortDir, keyword);
        return ResponseEntity.ok(pageStok);
    }

    @PostMapping
    public ResponseEntity<Stok> save(@RequestBody Stok stok) {
        Stok savedStok = stokService.save(stok);
        return ResponseEntity.ok(savedStok);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stok> update(@PathVariable Long id, @RequestBody Stok stok) {
        Stok updatedStok = stokService.update(id, stok);
        return ResponseEntity.ok(updatedStok);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        stokService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stok> findById(@PathVariable Long id) {
        Stok stok = stokService.findById(id);
        return ResponseEntity.ok(stok);
    }
}
