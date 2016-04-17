<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/25/14
 * Time: 10:39 AM
 */

namespace Bux\Admin\HomeBundle\Entity;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class AdminSettings
 *
 * @package Bux\Admin\HomeBundle\Entity
 * @ORM\Entity
 * @ORM\Table(name="bux_admin_settings")
 */
class AdminSettings
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="adminSettings")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $user;

    /**
     * @ORM\Column(type="text", name="personal_notes", nullable=true)
     */
    protected $personalNotes;

    /**
     * @ORM\Column(type="text", name="support_signature", nullable=true)
     */
    protected $supportSignature;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set personalNotes
     *
     * @param string $personalNotes
     *
     * @return AdminSettings
     */
    public function setPersonalNotes($personalNotes)
    {
        $this->personalNotes = $personalNotes;

        return $this;
    }

    /**
     * Get personalNotes
     *
     * @return string 
     */
    public function getPersonalNotes()
    {
        return $this->personalNotes;
    }

    /**
     * Set supportSignature
     *
     * @param string $supportSignature
     *
     * @return AdminSettings
     */
    public function setSupportSignature($supportSignature)
    {
        $this->supportSignature = $supportSignature;

        return $this;
    }

    /**
     * Get supportSignature
     *
     * @return string 
     */
    public function getSupportSignature()
    {
        return $this->supportSignature;
    }

    /**
     * Set user
     *
     * @param \Bux\UserBundle\Entity\User $user
     *
     * @return AdminSettings
     */
    public function setUser(User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Bux\UserBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }
}
