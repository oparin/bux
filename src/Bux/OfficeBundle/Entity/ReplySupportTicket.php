<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/9/15
 * Time: 10:34 AM
 */

namespace Bux\OfficeBundle\Entity;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class ReplySupportTicket
 *
 * @package Bux\OfficeBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_reply_support_tickets")
 */
class ReplySupportTicket
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\OfficeBundle\Entity\SupportTicket", inversedBy="replySupportTickets")
     * @ORM\JoinColumn(name="ticket_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $supportTicket;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="replySupportTickets")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="SET NULL")
     */
    protected $user;

    /**
     * @ORM\Column(type="text")
     */
    protected $text;

    /**
     * @ORM\Column(type="datetime", name="date")
     */
    protected $date;

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
     * Set text
     *
     * @param string $text
     *
     * @return ReplySupportTicket
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
    }

    /**
     * Get text
     *
     * @return string 
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return ReplySupportTicket
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime 
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set supportTicket
     *
     * @param \Bux\OfficeBundle\Entity\SupportTicket $supportTicket
     *
     * @return ReplySupportTicket
     */
    public function setSupportTicket(SupportTicket $supportTicket = null)
    {
        $this->supportTicket = $supportTicket;

        return $this;
    }

    /**
     * Get supportTicket
     *
     * @return \Bux\OfficeBundle\Entity\SupportTicket 
     */
    public function getSupportTicket()
    {
        return $this->supportTicket;
    }

    /**
     * Set user
     *
     * @param \Bux\UserBundle\Entity\User $user
     *
     * @return ReplySupportTicket
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
