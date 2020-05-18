<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductRepository")
 * @ApiResource(
 *     normalizationContext={"groups"={"product:read"}}
 * )
 * @ApiFilter(SearchFilter::class, properties={"category": "exact", "name": "partial", "id": "exact"})
 */
class Product
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("product:read")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("product:read")
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups("product:read")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=20)
     * @Groups("product:read")
     */
    private $brand;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups("product:read")
     */
    private $weight;

    /**
     * @ORM\Column(type="integer")
     * @Groups("product:read")
     */
    private $price;

    /**
     * @ORM\Column(type="integer")
     * @Groups("product:read")
     */
    private $stockQuantity;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Category", inversedBy="products")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("product:read")
     */
    private $category;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Color")
     * @Groups("product:read")
     */
    private $colors;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $imageFilename;

    public function __construct()
    {
        $this->colors = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function getWeight(): ?float
    {
        return $this->weight;
    }

    public function setWeight(?float $weight): self
    {
        $this->weight = $weight;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getStockQuantity(): ?int
    {
        return $this->stockQuantity;
    }

    public function setStockQuantity(int $stockQuantity): self
    {
        $this->stockQuantity = $stockQuantity;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection|Color[]
     */
    public function getColors(): Collection
    {
        return $this->colors;
    }

    public function addColor(Color $color): self
    {
        if (!$this->colors->contains($color)) {
            $this->colors[] = $color;
        }

        return $this;
    }

    public function removeColor(Color $color): self
    {
        if ($this->colors->contains($color)) {
            $this->colors->removeElement($color);
        }

        return $this;
    }

    public function getImageFilename(): ?string
    {
        return $this->imageFilename;
    }

    public function setImageFilename(string $imageFilename): self
    {
        $this->imageFilename = $imageFilename;

        return $this;
    }
}
