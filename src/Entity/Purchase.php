<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PurchaseRepository")
 * @ApiResource(
 *     normalizationContext={"groups"={"purchase:read"}},
 *     denormalizationContext={"groups"={"purchase:write"}}
 * )
 */
class Purchase
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"purchase:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"purchase:read", "purchase:write"})
     * @Assert\NotBlank(message="Please, enter your full name!")
     */
    private $customerName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"purchase:read", "purchase:write"})
     * @Assert\NotBlank(message="Please, enter your email address!")
     * @Assert\Email(message="Please, enter a valid email!")
     */
    private $customerEmail;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"purchase:read", "purchase:write"})
     * @Assert\NotBlank(message="Please, enter your street address!")
     */
    private $customerAddress;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     * @Groups({"purchase:read", "purchase:write"})
     * @Assert\NotBlank(message="Please, enter your ZIP code!")
     */
    private $customerZip;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"purchase:read", "purchase:write"})
     * @Assert\NotBlank(message="Please, enter your City!")
     */
    private $customerCity;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     * @Groups({"purchase:read", "purchase:write"})
     * @Assert\NotBlank(message="Please, provide a phone number!")
     */
    private $customerPhone;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"purchase:read"})
     */
    private $isShipped = false;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"purchase:read"})
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PurchaseItem", mappedBy="purchase", orphanRemoval=true, cascade={"persist"})
     * @Groups({"purchase:read", "purchase:write"})
     */
    private $purchaseItems;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->purchaseItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCustomerName(): ?string
    {
        return $this->customerName;
    }

    public function setCustomerName(string $customerName): self
    {
        $this->customerName = $customerName;

        return $this;
    }

    public function getCustomerEmail(): ?string
    {
        return $this->customerEmail;
    }

    public function setCustomerEmail(string $customerEmail): self
    {
        $this->customerEmail = $customerEmail;

        return $this;
    }

    public function getCustomerAddress(): ?string
    {
        return $this->customerAddress;
    }

    public function setCustomerAddress(string $customerAddress): self
    {
        $this->customerAddress = $customerAddress;

        return $this;
    }

    public function getCustomerZip(): ?string
    {
        return $this->customerZip;
    }

    public function setCustomerZip(?string $customerZip): self
    {
        $this->customerZip = $customerZip;

        return $this;
    }

    public function getCustomerCity(): ?string
    {
        return $this->customerCity;
    }

    public function setCustomerCity(string $customerCity): self
    {
        $this->customerCity = $customerCity;

        return $this;
    }

    public function getCustomerPhone(): ?string
    {
        return $this->customerPhone;
    }

    public function setCustomerPhone(?string $customerPhone): self
    {
        $this->customerPhone = $customerPhone;

        return $this;
    }

    public function getIsShipped(): ?bool
    {
        return $this->isShipped;
    }

    public function setIsShipped(bool $isShipped): self
    {
        $this->isShipped = $isShipped;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection|PurchaseItem[]
     */
    public function getPurchaseItems(): Collection
    {
        return $this->purchaseItems;
    }

    public function addPurchaseItem(PurchaseItem $purchaseItem): self
    {
        if (!$this->purchaseItems->contains($purchaseItem)) {
            $this->purchaseItems[] = $purchaseItem;
            $purchaseItem->setPurchase($this);
        }

        return $this;
    }

    public function removePurchaseItem(PurchaseItem $purchaseItem): self
    {
        if ($this->purchaseItems->contains($purchaseItem)) {
            $this->purchaseItems->removeElement($purchaseItem);
            // set the owning side to null (unless already changed)
            if ($purchaseItem->getPurchase() === $this) {
                $purchaseItem->setPurchase(null);
            }
        }

        return $this;
    }
}
